export default {
  addIngredient(state, payload) {
    state.ingredients.push(payload);
  },

  updatePreferedIngredients(state, payload) {
    state.preferedIngredients = payload;
  },

  updateNotIngredients(state, payload) {
    state.notIngredients = payload;
  },
};
