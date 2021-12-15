import Vue from "vue";
import Vuex from "vuex";

import ingredients from "./ingredients/index.js";
import recipes from "./recipes/index.js";

Vue.use(Vuex);

const store = {
  modules: {
    ingredients,
    recipes,
  },
  getters: {
    baseURL(state) {
      return state.baseUrl;
    },
  },
  state: {
    baseUrl: "http://localhost:8080",
  },
};

export default new Vuex.Store({
  ...store,
});