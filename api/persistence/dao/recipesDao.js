const { title } = require("../../models/Recipe");

let collection = "recipes";

class RecipesDao {
  constructor() {
    if (!RecipesDao.instance) {
      this._isInitialized = false;
      RecipesDao.instance = this;
    }
    return RecipesDao.instance;
  }

  async _init() {
    this._collection = collection;
    this._mongoDriver = await require("../drivers/mongoDBUtils")();
    this._neo4jDriver = await require("../drivers/neo4jDBUtils")();
  }

  async getTotalRecipesCount() {
    let query = [{ $count: "count" }];
    return (await this._mongoDriver).executeQueryAggregated(query, collection);
  }

  async getRecipes(
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  ) {
    if (filterByNotIngredients || filterByNotIngredients) {
      let query = this.buildNeo4Jquery(
        filterByIngredients,
        filterByNotIngredients,
        orderBy,
        page,
        pageSize
      );
      return (await this._neo4jDriver).executeQuery(query);
    } else {
      let aggregation = this.buildMongoQuery(orderBy, page, pageSize);
      return (await this._mongoDriver).executeQueryAggregated(
        aggregation,
        collection
      );
    }
  }

  buildNeo4Jquery(
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  ) {

    let query = 'MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe) '+
                'WITH r, collect(i.name) as r_ingredients, ';

    if(filterByIngredients){
        query += `${filterByIngredients} as ingredients WHERE apoc.coll.containsAll(r_ingredients, ingredients) `
        if(filterByNotIngredients){
          query+= 'WITH r, r_ingredients, '
        }
    }

    if(filterByNotIngredients) {
      query += `${filterByNotIngredients} as ingredients WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN ingredients) RETURN DISTINCT r;`
    }

    console.log(query)

    

   
    /*


    MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe)

    WITH r, collect(i.name) as r_ingredients, ${filterByIngredients} as ingredients
    WHERE apoc.coll.containsAll(r_ingredients, ingredients)
    
    
    WITH r,i,r_ingredients, ${filterByNotIngredientes} as notIngredients
    WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN notIngredients) 
    return distinct(r)



    MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe)
    WITH r, i, collect(i.name) as r_ingredients, ['salt', 'pepper', 'eggs'] as ingredients 
    WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN ingredients) 
    
    
    
    RETURN DISTINCT i;
    */

    /*
    MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe)
    WITH r, collect(i.name) as r_ingredients, ['salt', 'pepper'] as ingredients
    WHERE apoc.coll.containsAll(r_ingredients, ingredients)
    RETURN r;
    */







    /*
    MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe)
    WITH r, i, collect(i.name) as r_ingredients, ['salt', 'pepper', 'eggs'] as ingredients 
    WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN ingredients) 
    
    
    
    RETURN DISTINCT i;
    */

    /*
    MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe)
    WITH r, collect(i.name) as r_ingredients, ['salt', 'pepper'] as ingredients
    WHERE apoc.coll.containsAll(r_ingredients, ingredients)
    RETURN r;
    */

  }

  buildMongoQuery(orderBy, page, pageSize) {
    let aux = orderBy.split("_");

    let orderCriteria = aux[1].toLowerCase();
    let order;

    if (aux[0] == "LESS") {
      order = -1;
    } else {
      order = 1;
    }

    let aggregation = [
      {
        $sort: {
          [orderCriteria]: order,
          title: 1,
          _id: 1,
        },
      },
      { $limit: pageSize },
      { $skip: page * pageSize },
    ];

    return aggregation;
  }
}

let recipesDao = new RecipesDao();

module.exports = async () => {
  if (!recipesDao._isInitialized) {
    recipesDao._isInitialized = true;
    await recipesDao._init();

    Object.freeze(recipesDao);
  }
  return recipesDao;
};
