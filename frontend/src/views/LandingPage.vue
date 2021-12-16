<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-card color="#F1FAEE" class="ml-16 pt-5 px-4">
          <v-form v-model="valid">
            <v-container v-if="!loadingIngredients" fill-height fuild>
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
                <v-col cols="12" class="pb-0 pt-0">
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
              <v-row align="center" justify="center">
                <v-col cols="12" class="text-center">
                  <v-btn
                    @click="search"
                    color="#A8DADC"
                    align="center"
                    rounded
                    dark
                    :class="btnClass"
                  >
                    Buscar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else fill-height fuild>
              <v-progress-circular
                :size="70"
                :width="7"
                color="#A8DADC"
                indeterminate
              ></v-progress-circular>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex-column align-center">
        <v-card height="620px" color="#F1FAEE">
          <v-container v-if="!loadingRecipes">
            <v-container v-if="recipes.length > 0">
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
                color="#A8DADC"
                v-model="page"
                :total-visible="visible"
                class="mt-5"
              >
              </v-pagination>
            </v-container>
            <v-container v-else> There is no recipes to show </v-container>
          </v-container>
          <v-container v-else>
            <v-progress-circular
              :size="70"
              :width="7"
              color="#A8DADC"
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
import { mapGetters } from "vuex";

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
        this.queryName === ""
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

      this.$router.push({
        path: this.$route.path,
        query: { ...queryParams },
      });

      let response = await this.$store.dispatch("getRecipes", queryParams);
      this.updateView(response);
    },

    async seedIngredients() {
      if (this.ingredients.length == 0) {
        this.$store.dispatch("getIngredients");
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
            ? this.preferedIngredients
            : "",
        queryName: this.$route.query.queryName || this.queryName || "",
      };

      this.$router.push({
        path: this.$route.path,
        query: { ...queryParams },
      });


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
      };

      this.$router.push({
        path: this.$route.path,
        query: { ...queryParams },
      });

      let response = await this.$store.dispatch("getRecipes", queryParams);

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

      let queryParams = {
        page: page,
        pageSize: pageSize,
        ingredients: ingredients,
        notIngredients: notIngredients,
        queryName: queryName,
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
</style>
