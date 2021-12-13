const fs = require("fs");
const neo4j = require("neo4j-driver");
const file = "./recipesMongo.json";

async function main() {
  const driver = neo4j.driver("bolt://localhost");

  await fs.readFile(file, "utf8", async (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      // parse JSON string to JSON object
      const recipes = JSON.parse(data);
      for (const recipe of recipes) {
        recipe._id = recipe._id.$oid;
        await populateData(recipe, driver);
      }
    }
  });
  await driver.close();
}

async function populateData(recipe, driver) {
  const session = await driver.session();
  try {
    await session.run(
      "MERGE (r:Recipe {name: $value.title})\n" +
        "set r.calories = $value.nutrition.calories\n" +
        "set r.totalFat = $value.nutrition.totalFat\n" +
        "set r.sugar = $value.nutrition.sugar\n" +
        "set r.sodium = $value.nutrition.sodium\n" +
        "set r.protein =  $value.nutrition.protein\n" +
        "set r.saturatedFat =  $value.nutrition.saturatedFat\n" +
        "set r.carbohydrates =  $value.nutrition.carbohydrates\n" +
        "set r.minutes =  $value.minutes\n" +
        "set r.id = $value._id\n" +
        "WITH r, $value as value\n" +
        "UNWIND $value.ingredients AS ingredient\n" +
        "MERGE (i:Ingredient {name: ingredient})\n" +
        "MERGE (i)-[:INGREDIENT_OF]->(r)\n",
      { value: recipe }
    );
  } finally {
    await session.close();
  }
}

(async () => {
  await main();
})();
