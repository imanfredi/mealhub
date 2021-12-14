let uri = "recipes";

class Recipe {
  constructor(recipe) {
    this._id = recipe._id;
    this._title = recipe.title;
    this._description = recipe.description;
    this._ingredients = recipe.ingredients;
    this._n_ingredients = recipe.n_ingredients;
    this._steps = recipe.steps;
    this._n_steps = recipe.n_steps;
    this._minutes = recipe.minutes;
    this._tags = recipe.tags;
    this._nutrition = recipe.nutrition;
    this._url = this.buildUrl();
  }

  buildUrl() {
    return process.env.BASE_URI + uri + "/" + this._id;
  }
}

module.exports = Recipe;
