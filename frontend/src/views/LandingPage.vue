<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-card color="#F1FAEE" class="ml-16 pt-5 px-4">
          <v-container v-if="!loadingIngredients" fill-height fuild>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-text-field
                  label="Buscá la receta que quieras"
                  solo
                  v-model="queryName"
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
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex-column align-center">
        <v-card height="620px" color="#F1FAEE">
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
              color="#A8DADC"
              v-model="page"
              :total-visible="visible"
              class="mt-5"
            >
            </v-pagination>
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
      loadingRecipes: true,
      loadingIngredients: true,
      first: Number,
      last: Number,
      next: Number,
      prev: Number,
      page: 1,
      visible: 5,
      queryName: "",
    };
  },
  components: {
    RecipeCard,
  },

  computed: {
    ...mapGetters([
      "recipes",
      "ingredients",
      "preferedIngredients",
      "notIngredients",
    ]),
  },

  created() {
    // this.page = this.$route.queryParams.page;
    // this.pageSize = this.$route.queryParams.pageSize;
    // this.ingredients = this.$route.queryParams.ingredients;
    // this.notIingredients = this.$route.queryParams.notIingredients;
    // this.queryName = this.$route.queryParams.queryName;

    this.seedRecipes();
    this.seedIngredients();
  },

  methods: {
    async seedRecipes() {
      if (this.recipes() && this.recipes().length > 0) {
        let queryParams = {
          page: this.page,
          pageSize: this.pageSize,
          ingredients: this.ingredients(),
          preferedIngredients: this.preferedIngredients(),
          notIngredients: this.notIingredients(),
          queryName: this.queryNamenotIngredients(),
        };
        await this.$store.dispatch("getRecipes", queryParams);
      }
      this.loadingRecipes = false;
    },

    async seedIngredients() {
      if (this.ingredients() && this.ingredients().length > 0) {
        this.$store.dispatch("getIngredients");
      }
      this.loadingIngredients = false;
    },

    async onPageChange(page) {
      this.loadingRecipes = true;
      this.page = page;

      let queryParams = {
        page: this.page,
        pageSize: this.pageSize,
        ingredients: this.preferedIngredients(),
        notIngredients: this.notIngredients(),
        title: this.queryName(),
      };

      await this.$store.dispatch("getRecipes", queryParams);
      this.loadingRecipes = false;
    },

    async search() {
      this.loadingRecipes = true;

      let queryParams = {
        pageSize: 3,
        page: 0,
        title: this.queryName(),
        ingredients: `[${this.preferedIngredients()}]`,
        notIngredients: `[${this.notIngredients()}]`,
      };

      await this.$store.dispatch("getRecipes", queryParams);
      this.loadingRecipes = false;
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
