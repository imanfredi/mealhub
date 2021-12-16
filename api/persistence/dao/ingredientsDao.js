const { title, nutrition } = require("../../models/Recipe");

let collection = "recipes";

class IngredientsDao {
  constructor() {
    if (!IngredientsDao.instance) {
      this._isInitialized = false;
      IngredientsDao.instance = this;
    }
    return IngredientsDao.instance;
  }

  async _init() {
    this._collection = collection;
    this._mongoDriver = await require("../drivers/mongoDBUtils")();
    this._neo4jDriver = await require("../drivers/neo4jDBUtils")();
  }

  async getTotalIngredientsCount() {
    let query = "MATCH (i:Ingredient) ";

    query += "RETURN count(DISTINCT i)";

    return (await this._neo4jDriver).executeQuery(query);
  }

  async getIngredients(orderBy) {
    let query = "MATCH (i:Ingredient) ";

    query += "RETURN DISTINCT i";

    let aux = orderBy.split("_");

    let order_by = ` ORDER BY i.name ${aux[0]}`;

    query += order_by;
    return (await this._neo4jDriver).executeQuery(query);
  }
}

let ingredientsDao = new IngredientsDao();

module.exports = async () => {
  if (!ingredientsDao._isInitialized) {
    ingredientsDao._isInitialized = true;
    await ingredientsDao._init();

    Object.freeze(ingredientsDao);
  }
  return ingredientsDao;
};
