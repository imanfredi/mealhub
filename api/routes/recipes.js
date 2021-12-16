const { query } = require("express");
const express = require("express");
const { filter, re } = require("mathjs");
const router = express.Router();
const Recipe = require("../models/Recipe");
const orderByOptions = require("../models/RecipeOrderByOptions");

let searchService;
let recipeService;

require("../services/searchService")().then(
  (service) => (searchService = service)
);

require("../services/recipeService")().then(
  (service) => (recipeService = service)
);

let defaultPage = 0;
let defaultPageSize = 16;
let defaultOrderBy = orderByOptions.LESS_CALORIES;

router.get("/", async (req, res) => {
  let page = req.query.page || defaultPage;
  let pageSize = req.query.pageSize || defaultPageSize;
  console.log(req.query.page);
  let filterByIngredients = null;

  if (req.query.ingredients != null) {
    if (!Array.isArray(req.query.ingredients)) {
      filterByIngredients = req.query.ingredients.split(",");
    } else {
      filterByIngredients = req.query.ingredients;
    }
  }

  let filterByNotIngredients = null;

  if (req.query.notIngredients != null) {
    if (!Array.isArray(req.query.notIngredients)) {
      filterByNotIngredients = req.query.notIngredients.split(",");
    } else {
      filterByNotIngredients = req.query.notIngredients;
    }
  }

  orderBy = req.query.orderBy || defaultOrderBy;
  let name = req.query.queryName;

  let results = await searchService.getRecipes(
    name,
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  );

  if (results == null) {
    return res.status(404).send("Recipes not found"); //FIXME: BAD REQUEST
  }

  let url =
    req.protocol + "://" + req.get("host") + req.originalUrl.split("?")[0];
  url = buildUrl(url, req);

  aux = results.getResults();
  let recipes = [];

  for (i = 0; i < aux.length; i++) {
    recipes.push(new Recipe(aux[i]));
  }

  results.setResults(recipes);

  createPaginationResponse(res, results, url);
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;

  if (!id) {
    return res.status(400).send("ID is missing");
  }

  let recipe = await recipeService.getRecipesById(id);

  if (recipe == null) {
    return res.status(400).send();
  } else if (recipe.length == 0) {
    return res.status(404).send(`Recipe with ${id} not found`);
  }

  res.send(recipe);

  //GET recipe with id
});

function buildUrl(uri, req) {
  let params = "?";

  if (req.query.ingredients) {
    let ingredients = req.query.ingredients;
    if (!Array.isArray(req.query.ingredients)) {
      ingredients = req.query.ingredients.split(",");
    }
    for (i = 0; i < ingredients.length; i++) {
      params += "ingredients=" + ingredients[i] + "&";
    }
  }

  if (req.query.notIngredients) {
    let notIngredients = req.query.notIngredients;

    if (!Array.isArray(req.query.notIngredients)) {
      notIngredients = req.query.notIngredients.split(",");
    }
    for (i = 0; i < notIngredients.length; i++) {
      params += "notIngredients" + notIngredients[i] + "&";
    }
  }

  let orderBy = req.query.orderBy ? req.query.orderBy : defaultOrderBy;

  params += "orderBy=" + orderBy + "&";

  let pageSize = req.query.pageSize ? req.query.pageSize : defaultPageSize;
  params += "pageSize=" + pageSize + "&";
  params += "page=";
  uri += params;
  return uri;
}

function createPaginationResponse(res, results, url) {
  if (results.getResults().length == 0) {
    return res.status(204).send(); //NO CONTENT
  }

  addPaginationLinks(res, results, url);
}

function addPaginationLinks(res, results, url) {
  let page = parseInt(results.getPage());
  let first = 0;
  let last = results.getLastPage();
  let prev = page - 1;
  let next = page + 1;
  link = [];

  link.push(url + first + "; rel=first");

  link.push(url + last + "; rel=last");

  if (page != first) {
    link.push(url + prev + "; rel=prev");
  }

  if (page != last) {
    link.push(url + next + "; rel=next");
  }

  res.set("Link", link);
  res.send(results.getResults());
}

module.exports = router;
