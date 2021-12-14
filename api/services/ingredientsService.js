const PaginatedSearchResult = require("../models/PaginatedSearchResult");
const orderByOptions = require("../models/IngredientsOrderByOptions");
const express = require("express");

class IngredientsService {
  constructor() {
    if (!IngredientsService.instance) {
      this._isInitialized = false;
      IngredientsService.instance = this;
    }
    return IngredientsService.instance;
  }

  async _init() {
    this._ingredientsDao = await require("../persistence/dao/ingredientsDao")();
  }

  async getIngredients(page, pageSize, orderBy) {
    // if (page < 0) {
    // console.debug("Invalid page number");
    // return null;
    // }

    // if (pageSize <= 0) {
    // console.debug("Invalid page size number");
    // return null;
    // }

    // if (orderBy) {
    // if (!orderByOptions.hasOwnProperty(orderBy)) {
    // return null;
    // }
    // } else {
    orderBy = orderByOptions.ASC_ALPHABETIC;
    // }

    // let totalIngredients = await this._ingredientsDao.getTotalIngredientsCount();
    // let totalPages = Math.ceil(totalIngredients / pageSize);

    //No hay ninguna receta o la pagina solicitada no tiene resultados porque no hay suficiente cantidad
    // if (totalPages == 0 || page >= totalPages) {
    // return new PaginatedSearchResult(page, pageSize, totalRecipes, new []());
    // }

    // let results = await this._ingredientsDao.getIngredients(
    // orderBy,
    // page,
    // pageSize
    // );
    let results = await this._ingredientsDao.getIngredients(orderBy);
    return results;

    // return new PaginatedSearchResult(page, pageSize, totalIngredients, results);
  }
}

let ingredientsService = new IngredientsService();

module.exports = async () => {
  if (!ingredientsService._isInitialized) {
    ingredientsService._isInitialized = true;

    await ingredientsService._init();

    Object.freeze(ingredientsService);
  }

  return ingredientsService;
};
