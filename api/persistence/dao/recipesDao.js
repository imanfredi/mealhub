const { ObjectId } = require("mongodb");
const { title, nutrition } = require("../../models/Recipe");

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

  async getTotalRecipesCount(filterByIngredients, filterByNotIngredients) {
    let query = this.buildNeo4JQueryCount(
      filterByIngredients,
      filterByNotIngredients
    );
    return (await this._neo4jDriver).executeQueryCount(query);
  }

  async getRecipes(
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  ) {
    let query = this.buildNeo4Jquery(
      filterByIngredients,
      filterByNotIngredients,
      orderBy,
      page,
      pageSize
    );
    let results = await this._neo4jDriver.executeQuery(query);

    let aggregation = this.buildMongoQuery(results, orderBy);
    let recipes = await this._mongoDriver.executeQueryAggregated(
      aggregation,
      collection
    );
    console.log(recipes);
    return recipes;
  }

  async getRecipesById(id) {
    let aggregation = [
      {
        $match: {
          _id: id,
        },
      },
    ];

    return await this._mongoDriver.executeQueryAggregated(
      aggregation,
      collection
    );
  }

  buildNeo4Jquery(
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  ) {
    let query =
      "MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe) " +
      "WITH r, collect(i.name) as r_ingredients, ";

    if (filterByIngredients) {
      let aux = "[";

      for (var i = 0; i < filterByIngredients.length; i++) {
        // aux += "'(?i).*" + filterByIngredients[i] + ".*',";
        aux += "'" + filterByIngredients[i] + "',";
      }
      aux = aux.slice(0, -1);

      aux += "]";

      query += `${aux} as ingredients WHERE apoc.coll.containsAll(r_ingredients, ingredients) `;
      if (filterByNotIngredients) {
        query += "WITH r, r_ingredients, ";
      }
    }

    if (filterByNotIngredients) {
      let aux = "[";

      for (var i = 0; i < filterByNotIngredients.length; i++) {
        // aux += "'(?i).*" + filterByNotIngredients[i] + ".*',";
        aux += "'" + filterByNotIngredients[i] + "',";
      }

      aux = aux.slice(0, -1);
      aux += "]";

      query += `${aux} as notIngredients WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN notIngredients) `;
    }

    query += "RETURN DISTINCT r";

    let aux = orderBy.split("_");

    let orderCriteria = aux[1].toLowerCase();
    let order;

    if (aux[0] == "LESS") {
      order = "DESC";
    } else {
      order = "ASC";
    }

    let order_by = ` ORDER BY r.${orderCriteria}, r.name, id(r)  ${order}`;
    let limit = ` LIMIT ${pageSize}`;
    let skip = ` SKIP ${pageSize * page}`;

    query += order_by + skip + limit;
    return query;
  }

  buildNeo4JQueryCount(filterByIngredients, filterByNotIngredients) {
    let query = "MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe) ";

    if (filterByIngredients) {
      query += "WITH r, collect(i.name) as r_ingredients, ";

      let aux = "[";

      for (var i = 0; i < filterByIngredients.length; i++) {
        // aux += "'(?i).*" + filterByIngredients[i] + ".*',";
        aux += "'" + filterByIngredients[i] + "',";
      }
      aux = aux.slice(0, -1);

      aux += "]";

      query += `${aux} as ingredients WHERE apoc.coll.containsAll(r_ingredients, ingredients) `;
    }

    if (filterByNotIngredients) {
      query += "WITH r, r_ingredients, ";

      let aux = "[";

      for (var i = 0; i < filterByNotIngredients.length; i++) {
        // aux += "'(?i).*" + filterByNotIngredients[i] + ".*',";
        aux += "'" + filterByNotIngredients[i] + "',";
      }

      aux = aux.slice(0, -1);
      aux += "]";

      query += `${aux} as notIngredients WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN notIngredients) `;
    }

    query += "RETURN count(DISTINCT r)";

    return query;
  }

  buildMongoQuery(results, orderBy) {
    // let ids = '[';
    let ids = [];
    for (const result of results) {
      ids.push(ObjectId(result));
      // ids+=`'${result.id}',`;
    }
    // ids = ids.slice(0,-1);
    // ids+=']';

    let aux = orderBy.split("_");

    let orderCriteria = aux[1].toLowerCase();
    let order;

    if (aux[0] == "LESS") {
      order = 1;
    } else {
      order = -1;
    }

    if (aux[1] != "MINUTES") {
      orderCriteria = "nutrition." + orderCriteria;
    }
    console.log(orderBy);

    let aggregation = [
      {
        $match: {
          _id: {
            $in: ids,
          },
        },
      },
      {
        $sort: {
          [orderCriteria]: order,
          title: 1,
          _id: 1,
        },
      },
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
