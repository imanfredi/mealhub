import axios from "axios";

export default {
  async getRecipes(context, payload) {
    let params = buildParams(payload);

    try {
      let response = await axios.get(
        `${context.getters.baseURL}/recipes?` + new URLSearchParams(params)
      );
      let pagination;
      if (response.status == 200) {
        pagination = parseLink(response.headers.link);
      }
      return {
        recipes: response.data,
        ...pagination,
      };
    } catch (error) {
      console.log(error);
      //FIXME: lanzar error

      return null;
    }
  },

  async getRecipesById(context, payload) {
    try {
      console.log(`${context.getters.baseURL}/recipes/` + payload.id);
      let response = await axios.get(
        `${context.getters.baseURL}/recipes/` + payload.id
      );
      return response.data[0];
    } catch (error) {
      console.log(error);
      // throw new Error() //FIXME:
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

function buildParams(payload) {
  let params = {
    pageSize: payload.pageSize,
    page: payload.page,
  };

  if (payload.queryName) {
    params.queryName = payload.queryName;
  }

  if (payload.ingredients) {
    params.ingredients = payload.ingredients;
  }

  if (payload.notIngredients) {
    params.notIngredients = payload.notIngredients;
  }
  return params;
}
