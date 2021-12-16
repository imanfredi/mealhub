const express = require("express");
const router = express.Router();
const buildDevLogger = require("../logger/dev-logger");

let logger = buildDevLogger();

let ingredientsService;
require("../services/ingredientsService")().then(
  (service) => (ingredientsService = service)
);

router.get("/", async (req, res) => {
  // let page = req.query.page || 0;
  // let pageSize = req.query.pageSize || 16;
  // let orderBy = req.query.orderBy;
  let results = await ingredientsService.getIngredients();

  if (results == null) {
    logger.error("GET /ingredients: results were null");
    return res.status(404).send("Ingredients not found");
  }
  // res.send(results);
  logger.info("GET /ingredients: sent ingredients");
  res.send(results);
});

module.exports = buildDevLogger();
module.exports = router;
