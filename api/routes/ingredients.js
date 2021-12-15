const express = require("express");
const router = express.Router();

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
    return res.status(404).send("Ingredients not found"); //FIXME: BAD REQUEST
  }
  // res.send(results);
  res.send(results);
});

module.exports = router;
