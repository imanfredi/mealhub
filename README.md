# Mealhub

## Authors
- [Agustín Manfredi](https://github.com/imanfredi)
- [Nicolás Rampoldi](https://github.com/NicolasRampoldi) 

## About Mealhub
Mealhub is a website filled with data from the [Food.com Recipes and Interactions](https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv) dataset. The aim of this project is to provide an assistance at the time of deciding what to eat taking into account possible food allergies or food dislikes. To achieve this, the website provides the following features:
- Search a recipe by its name.
- Filter recipes by the ingredients needed to make it.
- Filter recipes by the ingredients not needed to make it.
- Order recipes by amount of calories, sugar, protein, carbohydrates or by the time it takes to make it.

## Databases
### MongoDB
The recipes inside the mongo database have the following information: Title, Ingredients, Number of Ingredients, Steps, Number of Steps, Minutes, Tags and Nutritional values.
So this database is used to store the core information of the recipe.

### Neo4j
The neo4j database was used to mainly store the relationships between the ingredients and the recipes. That is which ingredients are of which recipe (relationship INGREDIENT_OF). This allows the filter by ingredients feature to be much faster than with any another database. 

## Database population
### Node.js

1. Download Node.js (Version 16.3.0) from [here](https://nodejs.org/en/).

2. Install the csv-parser package
```npm i -s csv-parser```

3. Run the mealhub.js script which saves all the data in a json array.
```node mealhub.js```

### MongoDB

1. Download the mongo image and instantiate the container.

    1. ```docker pull mongo```
    2. ```docker run --name mealhubMongo -p 27017:27017 -d mongo```
    3. ```docker exec -it mealhubMongo bash```

    The mongo server is listening on its standard port: 27017.

2. Move the file recipes.json to the mongo container:
    ```docker cp recipes.json mealhubMongo:/recipes.json```

3. Inside the container execute the following commands:
    ```mongoimport --db mealhub --collection recipes --file recipes.json --jsonArray```
    ```mongoexport --collection=recipes --db=mealhub --out=recipesMongo.json --jsonArray```
4. Exit the container and execute:
    ```docker cp mealhubMongo:/recipesMongo.json ./recipesMongo.json```


### Neo4J

1.  Download the neo4j image and instantiate the container:
    ```docker pull neo4j```
    ```docker run --name mealhubNeo4j -p 7474:7474 -p 7687:7687 --env=NEO4J_AUTH=none -d neo4j```

2. Move the file recipes.json to the neo4j container:
    ```docker cp recipes.jsonmealhubNeo4j:/var/lib/neo4j/import/recipes.json```

3. Establish the connection with neo4j and populate the database running:
    ```node neo4jPopulation.js```

4. Open the neo4j browser user interface (on localhost:7474) and run the following command:
    ```CREATE FULLTEXT INDEX name FOR (r:Recipe) ON EACH [r.name]```

## Execution
1. First, make sure the docker images both from mongo and neo4j are up and running and the databases have already been populated following the previous instructions. 
2. Then, run ```npm install``` both inside the *api* and the *frontend* folder.
3. Inside the *api* folder, run the following command: ```npm run start```. Now, the express api is running and it could be used just to retrieve information making use of its endpoints. 
4. To fully grasp the user experience, run the Vue.js application inside the *frontend* folder running: ```npm run serve```. 

