const PaginatedSearchResult = require("../models/PaginatedSearchResult");
const orderByOptions = require("../models/OrderByOptions");
const express = require("express");

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

  async getRecipes(
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  ) {
    if (page < 0) {
      console.debug("Invalid page number");
      return null;
    }

    if (pageSize <= 0) {
      console.debug("Invalid page size number");
      return null;
    }

    if (orderBy) {
      if (!orderByOptions.hasOwnProperty(orderBy)) {
        return null;
      }
    } else {
      orderBy = orderByOptions.LESS_CALORIES;
    }

    let totalRecipes = await this._recipesDao.getTotalRecipesCount();
    console.log(totalRecipes)
    let totalPages = Math.ceil(totalRecipes / pageSize);

    //No hay ninguna receta o la pagina solicitada no tiene resultados porque no hay suficiente cantidad
    if (totalPages == 0 || page >= totalPages) {
      return new PaginatedSearchResult(page, pageSize, totalRecipes, new []());
    }

    let results = await this._recipesDao.getRecipes(
      filterByIngredients,
      filterByNotIngredients,
      orderBy,
      page,
      pageSize
    );

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
