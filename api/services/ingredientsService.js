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

  async getIngredients() {
    let results = await this._ingredientsDao.getIngredients(
      orderByOptions.ASC_ALPHABETIC
    );
    return results;
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
