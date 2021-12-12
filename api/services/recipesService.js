const PaginatedSearchResult = require("../models/PaginatedSearchResult");

class RecipeService {
  constructor() {
    if (!RecipeService.instance) {
      this._isInitialized = false;
      RecipeService.instance = this;
    }
    return RecipeService.instance;
  }

  async _init() {
    this._recipesDao = await require("../persistence/dao/recipesDao")();
  }

  async getRecipes(page, pageSize) {
    return await this._recipesDao.getRecipes(page, pageSize);
  }

  async getRecipesByName(name){
      return await this._recipesDao.getRecipesByName(name);
  }

}

let recipeService = new RecipeService();

module.exports = async () => {
  if (!recipeService._isInitialized) {
    recipeService._isInitialized = true;
    await recipeService._init();
    Object.freeze(recipeService);
  }
  return recipeService;
};
