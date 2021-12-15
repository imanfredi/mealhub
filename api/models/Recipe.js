let uri = "recipes";

class Recipe {
  constructor(recipe) {
    this.id = recipe._id;
    this.title = recipe.title;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;
    this.n_ingredients = recipe.n_ingredients;
    this.steps = recipe.steps;
    this.n_steps = recipe.n_steps;
    this.minutes = recipe.minutes;
    this.tags = recipe.tags;
    this.nutrition = recipe.nutrition;
    this.url = this.buildUrl();
  }

  buildUrl() {
    return process.env.BASE_URI + uri + "/" + this.id;
  }
}

module.exports = Recipe;
