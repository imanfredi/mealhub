<template>
  <v-container class="landing-container">
    <v-row class="ma-0" style="display: flex; justify-content: space-around">
      <v-col cols="5">
        <v-card color="#F1FAEE" class="py-4 px-7">
          <v-form v-model="valid">
            <v-container v-if="!loadingIngredients" fill-height fluid>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-text-field
                    label="Search for any recipe"
                    solo
                    :counter="20"
                    v-model="queryName"
                    :rules="queryRules"
                  ></v-text-field>
                </v-col>
              </v-row>
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
                    :items="ingredients"
                    v-model="preferedIngredients"
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
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    chips
                    clearable
                    deletable-chips
                    multiple
                    :items="ingredients"
                    v-model="notIngredients"
                    small-chips
                    solo
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="py-0">
                  <p class="text-center font-weight-medium strong mb-2">
                    Order By
                  </p>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="4" class="pt-0">
                  <hr style="margin: auto" />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex" cols="12">
                  <v-select
                    v-model="orderBy"
                    :items="categories"
                    item-text="text"
                    item-value="value"
                    solo
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="12" class="text-center py-0">
                  <v-btn
                    @click="search"
                    color="#A8DADC"
                    align="center"
                    rounded
                    dark
                    :class="btnClass"
                  >
                    Search
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else fill-height fluid>
              <v-progress-circular
                :size="70"
                :width="7"
                color="#A8DADC"
                indeterminate
                style="display: block; margin: 0 auto"
              ></v-progress-circular>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card min-height="620px" min-width="585px" color="#F1FAEE">
          <v-container v-if="!loadingRecipes">
            <v-container v-if="recipes.length > 0" class="mt-10">
              <v-row v-for="(recipe, index) in recipes" :key="index">
                <v-col cols="12">
                  <RecipeCard :recipe="recipe"></RecipeCard>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" align-self="end">
                  <v-pagination
                    @input="onPageChange($event)"
                    :length="last"
                    color="#A8DADC"
                    v-model="page"
                    :total-visible="visible"
                    class="mt-5"
                  >
                  </v-pagination>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else>
              <v-row>
                <v-col cols="12">
                  <p class="text-center">There is no recipes to show</p>
                </v-col>
              </v-row>
            </v-container>
          </v-container>
          <v-container fluid v-else>
            <v-layout align-center justify-center column fill-height>
              <v-progress-circular
                :size="70"
                :width="7"
                color="#A8DADC"
                indeterminate
                style="display: block; margin: auto"
              ></v-progress-circular>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "LandingPage",

  data() {
    return {
      categories: [
        { value: "LESS_MINUTES", text: "Less Minutes" },
        { value: "MOST_MINUTES", text: "Most Minutes" },
        { value: "LESS_CALORIES", text: "Less Calories" },
        { value: "MOST_CALORIES", text: "Most Calories" },
        { value: "LESS_SUGAR", text: "Less Sugar" },
        { value: "MOST_SUGAR", text: "Most Sugar" },
        { value: "LESS_PROTEIN", text: "Less Protein" },
        { value: "MOST_PROTEIN", text: "Most Protein" },
        { value: "LESS_CARBOHYDRATES", text: "Less Carbs" },
        { value: "MOST_CARBOHYDRATES", text: "Most Carbs" },
      ],
      recipes: [],
      preferedIngredients: [],
      notIngredients: [],
      loadingRecipes: true,
      loadingIngredients: true,
      first: 0,
      last: 0,
      next: 0,
      prev: 0,
      page: 1,
      visible: 5,
      queryName: "",
      orderBy: "LESS_CALORIES",
      pageSize: 3,
      valid: false,
      isActive: false,
      queryRules: [
        (v) => v.length <= 20 || "Recipe must be less than 20 characters",
      ],
    };
  },
  components: {
    RecipeCard,
  },

  computed: {
    ...mapGetters(["ingredients"]),
    btnClass() {
      if (
        this.preferedIngredients.length == 0 &&
        this.notIngredients.length == 0 &&
        this.queryName === "" &&
        this.orderBy === ""
      ) {
        return "disableButton";
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.preferedIngredients = this.$store.getters.preferedIngredients;
    this.notIngredients = this.$store.getters.notIngredients;
    this.seedRecipes();
    this.seedIngredients();
  },

  methods: {
    async seedRecipes() {
      let queryParams = this.getQueryParams();

      this.$router
        .push({
          path: this.$route.path,
          query: { ...queryParams },
        })
        .catch(() => {});

      let response;
      try {
        response = await this.$store.dispatch("getRecipes", queryParams);
      } catch (e) {
        this.$router
          .push({
            name: "Error",
            params: { message: e, statusCode: "500" },
          })
          .catch(() => {});
      }

      this.updateView(response);
    },

    async seedIngredients() {
      if (this.ingredients.length == 0) {
        try {
          await this.$store.dispatch("getIngredients");
        } catch (e) {
          this.$router
            .push({
              name: "Error",
              params: { message: e, statusCode: "500" },
            })
            .catch(() => {});
        }
      }
      this.loadingIngredients = false;
    },

    async onPageChange(page) {
      this.loadingRecipes = true;
      this.page = page;

      let queryParams = {
        page: this.page - 1,
        pageSize: this.$route.query.pageSize || this.pageSize,
        ingredients:
          this.$route.query.ingredients || this.preferedIngredients.length > 0
            ? this.preferedIngredients
            : "",
        notIngredients:
          this.$route.query.notIngredients || this.notIngredients.length > 0
            ? this.notIngredients
            : "",
        queryName: this.$route.query.queryName || this.queryName || "",
        orderBy: this.$route.query.orderBy || this.orderBy,
      };

      this.$router
        .push({
          path: this.$route.path,
          query: { ...queryParams },
        })
        .catch(() => {});

      let response = await this.$store.dispatch("getRecipes", queryParams);
      this.updateView(response);
    },

    async search() {
      this.loadingRecipes = true;
      this.$store.commit("updatePreferedIngredients", this.preferedIngredients);
      this.$store.commit("updateNotIngredients", this.notIngredients);
      if (this.page != 0) {
        this.page = 1;
      }
      let queryParams = {
        pageSize: this.pageSize,
        page: this.page - 1,
        queryName: this.queryName || "",
        ingredients: this.preferedIngredients || "",
        notIngredients: this.notIngredients || "",
        orderBy: this.orderBy,
      };

      this.$router
        .push({
          path: this.$route.path,
          query: { ...queryParams },
        })
        .catch(() => {});

      let response;
      try {
        response = await this.$store.dispatch("getRecipes", queryParams);
      } catch (e) {
        this.$router
          .push({
            name: "Error",
            params: { message: e, statusCode: "404" },
          })
          .catch(() => {});
      }

      this.updateView(response);
    },

    updateView(response) {
      this.recipes = response.recipes;
      this.prev = response.prev;
      this.next = response.next;
      this.first = response.first;
      this.last = response.last;
      this.loadingRecipes = false;
    },

    getQueryParams() {
      let page = this.$route.query.page || this.page - 1;
      let pageSize = this.$route.query.pageSize || this.pageSize;
      let ingredients = this.$route.query.ingredients || "";
      let notIngredients = this.$route.query.notIngredients || "";
      let queryName = this.$route.query.queryName || "";
      let orderBy = this.$route.query.orderBy || this.orderBy;

      let queryParams = {
        page: page,
        pageSize: pageSize,
        ingredients: ingredients,
        notIngredients: notIngredients,
        queryName: queryName,
        orderBy: orderBy,
      };
      return queryParams;
    },
    isDisabled() {},
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
.v-list {
  max-width: 400px !important;
}
.disableButton {
  border: 1px solid #999999 !important;
  background-color: #cccccc !important;
  color: #666666 !important;
  pointer-events: none !important;
}
.landing-container {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  min-height: 80vh !important;
}
.v-chip {
  background-color: #ffe8d6 !important;
}
</style>
