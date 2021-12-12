# Mealhub

## DataSet

El dataset utilizado puede encontrarse en: <a src="https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv">Foods and recipes</a>

## Instalación

### NodeJs

1. Descargar node.js desde <a src="https://nodejs.org/es/">Node JS</a> *Version 16.3.0* 

2. Instalar el modulo

    * npm i -s csv-parser

3. Ahora parseo el csv y guardo todo en un json array con el comando. Puedo correr ahora el mealhub.js con: 

    * node mealhub.js

### MongoDB

1. Descargar la imagen de mongo e instanciar el contenedor.

    * docker pull mongo
    * docker run --name mealhubMongo -p 27017:27017 -d mongo
    * docker exec -it mealhubMongo bash

El servidor de mongo escucha en su puerto estandar 27017

2. Mover el archivo recipes.json dentro del contenedor instanciado de mongo:
    * docker cp recipes.json mealhubMongo:/recipes.json

3. Luego dentro del contenedor ejecutar el comando:

    * mongoimport --db mealhub --collection recipes --file recipes.json --jsonArray

### Neo4J

1.  Descargar la imagen de Neo4J e instanciar el contenedor:

    * docker pull neo4j
    * docker run --name mealhubNeo4j -p 7474:7474 -p 7687:7687 --env=NEO4J_AUTH=none -d neo4j

2. Mover el archivo recipes.json dentro del contenedor instanciado de neo4j:
    * docker cp recipes.jsonmealhubNeo4j:/var/lib/neo4j/import/recipes.json

3. Realizar la conexión con neo4j y popular la base de datos con:

    * node neo4jPopulation.js

