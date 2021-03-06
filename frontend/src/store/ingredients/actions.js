import axios from "axios";

export default {
  async getIngredients(context) {
    try {
      let response = await axios.get(context.getters.baseURL + "/ingredients");
      for (const ingredient of response.data) {
        context.commit("addIngredient", ingredient.name);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
