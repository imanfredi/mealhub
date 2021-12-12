const PaginatedSearchResult = require("../models/PaginatedSearchResult");

class SearchService {
  constructor() {
    if (!SearchService.instance) {
      this._isInitialized = false;
      SearchService.instance = this;
    }
    return SearchService.instance;
  }

  async _init() {
    this._recipesDao = await require("../persistence/dao/recipesDao")();
  }

  async getRecipes(page, pageSize) {
    if (page < 0) {
      console.debug("Invalid page number");
      return null;
    }

    if (pageSize <= 0) {
      console.debug("Invalid page size number");
      return null;
    }

    let totalRecipes = await this._recipesDao.getTotalRecipesCount();
    let totalPages = Math.ceil(totalRecipes / pageSize);

    //No hay ninguna receta o la pagina solicitada no tiene resultados porque no hay suficiente cantidad
    if (totalPages == 0 || page >= totalPages) {
      return new PaginatedSearchResult(page, pageSize, totalRecipes, new []());
    }

    let results = await this._recipesDao.getRecipes(page, pageSize);

    return new PaginatedSearchResult(page, pageSize, totalRecipes, results);
  }
}

let searchService = new SearchService();

module.exports = async () => {
  if (!searchService._isInitialized) {
    searchService._isInitialized = true;
    await searchService._init();
    Object.freeze(searchService);
  }
  return searchService;
};
