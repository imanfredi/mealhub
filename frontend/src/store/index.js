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
    baseUrl(state) {
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

// import Vue from "vue";
// import Vuex from "vuex";

// import ingredients from "./ingredients";
// import recipes from "./recipes";

// Vue.use(Vuex);

// const store = {
//   getters: {
//     baseUrl(state) {
//       return state.baseUrl;
//     },
//     recipes(state) {
//       return state.recipes;
//     },
//   },
//   state: {
//     baseUrl: "http://localhost:8080",
//   },

//   actions: {
//     async getIngredients(context, payload) {
//       try {
//         let response = await axios.get(
//           context.getters.baseURL + "/ingredients"
//         );
//         for (const ingredient of response.data) {
//           context.$store.commit("addIngredient", ingredient.name);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     },
//     async getRecipes(context, payload) {
//       try {
//         axios
//           .get(
//             `${context.getters.baseUrl}/recipes` + new URLSearchParams(...payload)
//           )
//           .then((response) => {
//             this.$store.commit("recipes", response.data);
//             let pagination = this.parseLink(response.headers.link);
//             return { ...pagination, ...response.data };
//           });
//       } catch (e) {
//         console.log(error);
//         return null;
//       }
//     },
//     async getRecipesById(context, payload) {
//       try {
//         axios
//           .get(`${context.getters.baseUrl}/recipes?` + payload.id)
//           .then((response) => {
//             return response.data;
//           });
//       } catch (e) {
//         console.log(error);
//         return null;
//       }
//     },
//   },
// };

// export default new Vuex.Store({
//   ...store,
// });

// function parseLink(linkHeader) {
//   let pagination = {};

//   let links = linkHeader.split(",");

//   for (const link of links) {
//     let aux = link.split(";");
//     let url = new URL(aux[0]);

//     if (aux[1] == " rel=first") {
//       pagination.first = parseInt(url.searchParams.get("page"));
//     } else if (aux[1] == " rel=last") {
//       pagination.last = parseInt(url.searchParams.get("page"));
//     } else if (aux[1] == " rel=prev") {
//       pagination.prev = parseInt(url.searchParams.get("page"));
//     } else {
//       pagination.next = parseInt(url.searchParams.get("page"));
//     }
//     if (pagination.prev == null) {
//       pagination.prev = pagination.first;
//     }
//     if (pagination.next == null) {
//       pagination.next = pagination.last;
//     }
//     pagination.total = pagination.last;
//     return pagination;
//   }
// }
