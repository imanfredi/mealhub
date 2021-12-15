import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import state from "./state.js";

export default {
  namespaced: true,
  state,
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
  },
  getters: {
    ...getters,
  },
};
