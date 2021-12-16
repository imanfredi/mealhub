const e = require("express");
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

  async getTotalRecipesCount(
    searchByName,
    filterByIngredients,
    filterByNotIngredients
  ) {
    let query = this.buildNeo4JQueryCount(
      searchByName,
      filterByIngredients,
      filterByNotIngredients
    );
    return await this._neo4jDriver.executeQueryCount(query);
  }

  async getRecipes(
    searchByName,
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  ) {
    let query = this.buildNeo4Jquery(
      searchByName,
      filterByIngredients,
      filterByNotIngredients,
      orderBy,
      page,
      pageSize
    );
    console.log(query);
    let results = await this._neo4jDriver.executeQuery(query);

    let aggregation = this.buildMongoQuery(results, orderBy);
    let recipes = await this._mongoDriver.executeQueryAggregated(
      aggregation,
      collection
    );
    return recipes;
  }

  async getRecipesById(id) {
    let aggregation;
    try {
      aggregation = [
        {
          $match: {
            _id: ObjectId(id),
          },
        },
      ];
    } catch (e) {
      console.log("Invalid id");
      return null;
    }

    return await this._mongoDriver.executeQueryAggregated(
      aggregation,
      collection
    );
  }

  buildNeo4Jquery(
    searchByName,
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  ) {
    let query;

    if (searchByName) {
      query =
        'CALL db.index.fulltext.queryNodes("name","' +
        searchByName +
        '~") YIELD node WITH node as r ' +
        "MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r) ";
    } else {
      query = "MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe) ";
    }
    query += "WITH r ";

    if (
      this.hasPreferedIngredients(filterByIngredients) ||
      this.hasNotPreferedIngredients(filterByNotIngredients)
    ) {
      query += ", collect(i.name) as r_ingredients, ";

      if (this.hasPreferedIngredients(filterByIngredients)) {
        let aux = "[";

        for (var i = 0; i < filterByIngredients.length; i++) {
          // aux += "'(?i).*" + filterByIngredients[i] + ".*',";
          aux += "'" + filterByIngredients[i] + "',";
        }
        aux = aux.slice(0, -1);

        aux += "]";

        query += `${aux} as ingredients WHERE apoc.coll.containsAll(r_ingredients, ingredients) `;

        if (this.hasNotPreferedIngredients(filterByNotIngredients)) {
          query += "WITH r, r_ingredients, ";
        }
      }

      if (this.hasNotPreferedIngredients(filterByNotIngredients)) {
        let aux = "[";

        for (var i = 0; i < filterByNotIngredients.length; i++) {
          // aux += "'(?i).*" + filterByNotIngredients[i] + ".*',";
          aux += "'" + filterByNotIngredients[i] + "',";
        }

        aux = aux.slice(0, -1);
        aux += "]";

        query += `${aux} as notIngredients WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN notIngredients) `;
      }
    }

    query += "RETURN DISTINCT r";

    let aux = orderBy.split("_");

    let orderCriteria = aux[1].toLowerCase();
    let order;

    if (aux[0] == "LESS") {
      order = "ASC";
    } else {
      order = "DESC";
    }

    let order_by = ` ORDER BY r.${orderCriteria} ${order}, r.name ASC, id(r) ASC`;
    let limit = ` LIMIT ${pageSize}`;
    let skip = ` SKIP ${pageSize * page}`;

    query += order_by + skip + limit;
    return query;
  }

  buildNeo4JQueryCount(
    searchByName,
    filterByIngredients,
    filterByNotIngredients
  ) {
    let query;

    if (searchByName) {
      query =
        'CALL db.index.fulltext.queryNodes("name","' +
        searchByName +
        '~") YIELD node WITH node as r ' +
        "MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r) ";
    } else {
      query = "MATCH (i:Ingredient)-[:INGREDIENT_OF]->(r:Recipe) ";
    }
    query += "WITH r ";

    if (
      this.hasPreferedIngredients(filterByIngredients) ||
      this.hasNotPreferedIngredients(filterByNotIngredients)
    ) {
      query += ", collect(i.name) as r_ingredients, ";

      if (this.hasPreferedIngredients(filterByIngredients)) {
        let aux = "[";

        for (var i = 0; i < filterByIngredients.length; i++) {
          // aux += "'(?i).*" + filterByIngredients[i] + ".*',";
          aux += "'" + filterByIngredients[i] + "',";
        }
        aux = aux.slice(0, -1);
        aux += "]";
        query += `${aux} as ingredients WHERE apoc.coll.containsAll(r_ingredients, ingredients) `;

        if (this.hasNotPreferedIngredients(filterByNotIngredients)) {
          query += "WITH r, r_ingredients, ";
        }
      }

      if (this.hasNotPreferedIngredients(filterByNotIngredients)) {
        let aux = "[";

        for (var i = 0; i < filterByNotIngredients.length; i++) {
          // aux += "'(?i).*" + filterByNotIngredients[i] + ".*',";
          aux += "'" + filterByNotIngredients[i] + "',";
        }

        aux = aux.slice(0, -1);
        aux += "]";

        query += `${aux} as notIngredients WHERE NOT ANY(ingredient in r_ingredients WHERE ingredient IN notIngredients) `;
      }
    }

    query += "RETURN count(DISTINCT r)";
    return query;
  }

  buildMongoQuery(results, orderBy) {
    let ids = [];
    for (const result of results) {
      ids.push(ObjectId(result));
    }

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

  hasPreferedIngredients(filterByIngredients) {
    return (
      filterByIngredients &&
      filterByIngredients.length > 0 &&
      filterByIngredients[0] != ""
    );
  }

  hasNotPreferedIngredients(filterByNotIngredients) {
    return (
      filterByNotIngredients &&
      filterByNotIngredients.length > 0 &&
      filterByNotIngredients[0] != ""
    );
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
