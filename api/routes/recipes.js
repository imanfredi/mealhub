const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

let searchService;
require("../services/searchService")().then(
  (service) => (searchService = service)
);

router.get("/", async (req, res) => {
  let page = req.query.page || 0;
  let pageSize = req.query.pageSize || 16;

  filterByIngredients = req.query.ingredients;
  filterByNotIngredients = req.query.notIngredients;
  orderBy = req.query.orderBy;

  let results = await searchService.getRecipes(
    filterByIngredients,
    filterByNotIngredients,
    orderBy,
    page,
    pageSize
  );

  if (results == null) {
    return res.status(400).send(); //FIXME: BAD REQUEST
  }

  res.send(results);
  //GET all recipes
});

router.get("/:title", (req, res) => {
  query = req.query.title;
  //GET recipe with id
});

router.post("/", (req, res) => {
  //POST recipe
});

router.patch("/:id", (req, res) => {
  //UPDATE recipe
});

router.delete("/:id", (req, res) => {
  //DELETE recipe
});

module.exports = router;
