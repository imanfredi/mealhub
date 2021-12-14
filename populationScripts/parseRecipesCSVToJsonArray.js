const csv = require("csv-parser");
const fs = require("fs");
const path = "./recipesAndInteractions/";
const fileName = "RAW_recipes.csv";
const filePath = path + fileName;
const outFileName = "recipes.json";

async function main() {
  await fs.appendFile(outFileName, "[", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //done!
  });

  let count = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      let steps = row.steps.slice(1, -1).split("', '");
      steps[0] = steps[0].substring(1); // al primer elemento le remuevo una doble comilla

      steps[steps.length - 1] = steps.at(-1).slice(0, -1); //al ultimo elemento le remuevo una doble commilla

      let nutrition = row.nutrition.slice(1, -1).split(", ");

      let ingredients = row.ingredients.slice(1, -1).split("', '");
      ingredients[0] = ingredients[0].substring(1);
      ingredients[ingredients.length - 1] = ingredients.at(-1).slice(0, -1);

      let tags = row.tags.slice(1, -1).split("', '");
      tags[0] = tags[0].substring(1);
      tags[tags.length - 1] = tags.at(-1).slice(0, -1);

      let recipe = {
        title: row.name.trim().replace(/\s\s+/g, ' '),
        description: row.description,
        ingredients: ingredients,
        n_ingredients: parseInt(row.n_ingredients),
        steps: steps,
        n_steps: parseInt(row.n_steps),
        minutes: parseInt(row.minutes),
        tags: tags,
        nutrition: {
         
          calories: parseFloat(nutrition[0]),
          totalFat: parseFloat(nutrition[1]),
          sugar: parseFloat(nutrition[2]),
          sodium: parseFloat(nutrition[3]),
          protein: parseFloat(nutrition[4]),
          saturatedFat: parseFloat(nutrition[5]),
          carbohydrates: parseFloat(nutrition[6]),
        },
      };

      if (count != 0) {
        await fs.appendFile(outFileName, "," + JSON.stringify(recipe), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //done!
        });
      } else {
        await fs.appendFile(outFileName, JSON.stringify(recipe), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //done!
        });
      }

      count++;
    })
    .on("end", async () => {
      await fs.appendFile(outFileName, "]", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //done!
      });
      console.log(count);
    });
}

(async () => {
  await main();
})();
