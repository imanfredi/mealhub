import axios from "axios";

export default {
  async getRecipes(context, payload) {
    try {
      axios
        .get(
          `${context.getters.baseUrl}/recipes` + new URLSearchParams(...payload)
        )
        .then((response) => {
          this.$store.commit("recipes", response.data);
          let pagination = this.parseLink(response.headers.link);
          return { ...pagination, ...response.data };
        });
    } catch (e) {
      console.log(error);
      return null;
    }
  },

  async getRecipesById(context, payload) {
    try {
      axios
        .get(`${context.getters.baseUrl}/recipes?` + payload.id)
        .then((response) => {
          return response.data;
        });
    } catch (e) {
      console.log(error);
      return null;
    }
  },
};

function parseLink(linkHeader) {
  let pagination = {};

  let links = linkHeader.split(",");

  for (const link of links) {
    let aux = link.split(";");
    let url = new URL(aux[0]);

    if (aux[1] == " rel=first") {
      pagination.first = parseInt(url.searchParams.get("page"));
    } else if (aux[1] == " rel=last") {
      pagination.last = parseInt(url.searchParams.get("page"));
    } else if (aux[1] == " rel=prev") {
      pagination.prev = parseInt(url.searchParams.get("page"));
    } else {
      pagination.next = parseInt(url.searchParams.get("page"));
    }
    if (pagination.prev == null) {
      pagination.prev = pagination.first;
    }
    if (pagination.next == null) {
      pagination.next = pagination.last;
    }
    pagination.total = pagination.last;
    return pagination;
  }
}
