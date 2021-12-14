<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-card color="#F1FAEE" class="ml-16 pt-5 px-4">
          <v-container fill-height fuild>
            <v-row>
              <v-col cols="12" class="pb-0 pt-0">
                <p class="text-center font-weight-medium strong mb-2">
                  Ingredients
                </p>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="4" class="pt-0">
                <hr style="margin: auto" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0 pt-0">
                <v-autocomplete
                  chips
                  clearable
                  deletable-chips
                  multiple
                  small-chips
                  solo
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0 pt-0">
                <p class="text-center font-weight-medium strong mb-2">
                  Not Ingredients
                </p>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="4" class="pt-0">
                <hr style="margin: auto" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0 pt-0">
                <v-autocomplete
                  chips
                  clearable
                  deletable-chips
                  multiple
                  small-chips
                  solo
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex-column align-center">
        <v-card height="600px" color="#F1FAEE">
          <v-container v-if="loadingRecipes">
            <v-row>
              <v-col cols="12" class="pt-7">
                <v-data-table
                  :headers="headers"
                  class="elevation-1"
                  disable-filtering
                  disable-pagination
                  hide-default-footer
                  no-data-text
                ></v-data-table>
              </v-col>
            </v-row>
            <v-row v-for="(recipe, index) in recipes" :key="index">
              <v-col cols="12">
                <RecipeCard :recipe="recipe"></RecipeCard>
              </v-col>
            </v-row>
            <v-pagination
              @input="onPageChange($event)"
              :length="last"
              circle
              v-model="page"
              :total-visible="visible"
            >
            </v-pagination>
          </v-container>
          <v-container v-else>
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import axios from "axios";

export default {
  name: "LandingPage",

  data() {
    return {
      headers: [
        { text: "Calories", value: "calories" },
        { text: "Protein (g)", value: "protein" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Sugar (g)", value: "sugar" },
        { text: "Minutes", value: "minutes" },
      ],
      recipes: [],
      ingredients: [],
      loadingRecipes: false,
      first: Number,
      last: Number,
      next: Number,
      prev: Number,
      page: 1,
      visible: 5,
    };
  },
  components: {
    RecipeCard,
  },

  created() {
    axios
      .get(process.env.VUE_APP_BASE_API_URL + "/recipes?pageSize=3&page=0")
      .then((response) => {
        this.recipes = response.data;
        this.parseLink(response.headers.link);
        this.loadingRecipes = true;
      });

    // axios
    //   .get(process.env.VUE_APP_BASE_API_URL + "/ingredients")
    //   .then((response) => {
    //     this.ingredients = response.data;
    //     console.log(response.headers.get("Link"));
    //   });
  },

  methods: {
    parseLink(linkHeader) {
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
        this.last = pagination.last;
        this.first = pagination.first;
        this.next = pagination.next;
        this.prev = pagination.prev;
      }
    },

    onPageChange(page) {
      console.log("aata");
      this.loadingRecipes = false;
      axios
        .get(
          process.env.VUE_APP_BASE_API_URL +
            "/recipes?pageSize=3&page=" +
            (page - 1)
        )
        .then((response) => {
          this.recipes = response.data;
          this.parseLink(response.headers.link);
          this.loadingRecipes = true;
        });
    },
  },
};
</script>

<style>
.bgImage {
  background-image: url("../assets/images/background_image.jpg");
  background-size: cover;
}
.v-data-table__empty-wrapper {
  display: none !important;
}
</style>
