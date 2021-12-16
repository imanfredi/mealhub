import axios from "axios";

export default {
  async getRecipes(context, payload) {
    try {
      let params = buildParams(payload);

      let response = await axios.get(
        `${context.getters.baseURL}/recipes?` + params
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
      throw new Error(error);
      //FIXME: lanzar error
    }
  },

  async getRecipesById(context, payload) {
    try {
      let response = await axios.get(
        `${context.getters.baseURL}/recipes/` + payload.id
      );
      return response.data[0];
    } catch (error) {
      console.log(error);
      throw new Error(error);
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
  let params = new URLSearchParams();
  params.append("pageSize", payload.pageSize);
  params.append("page", payload.page);

  if (payload.queryName) {
    params.append("queryName", payload.queryName);
  }
  if (payload.orderBy) {
    params.append("orderBy", payload.orderBy);
  }

  if (payload.ingredients) {
    let ingredients = payload.ingredients;
    if (Array.isArray(payload.ingredients) && payload.ingredients.length > 1) {
      for (const ing of ingredients) {
        params.append("ingredients", ing);
      }
    } else {
      params.append("ingredients", payload.ingredients);
    }
  }

  if (payload.notIngredients) {
    let notIngredients = payload.notIngredients;
    if (
      Array.isArray(payload.notIngredients) &&
      payload.notIngredients.length > 1
    ) {
      for (const ing of notIngredients) {
        params.append("notIngredients", ing);
      }
    } else {
      params.append("notIngredients", payload.notIngredients);
    }
  }

  return params;
}
