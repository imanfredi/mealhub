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
    this._neo4jDriver = await require("../persistence/neo4jDBUtils")();
  }

  async getTotalRecipesCount() {
    let query = [{ $count: "count" }];
    return (await this._mongoDriver).executeQuery(query, collection);
  }

  async getRecipes(page, pageSize){
        

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
