<template>
  <v-container class="pa-0 recipe-container">
    <v-row class="ma-0">
      <v-col cols="12" align="center" justify="center">
        <v-card color="#F1FAEE" width="700px" min-height="800px">
          <v-container fill-height fluid v-if="!loadingRecipe">
            <v-row>
              <v-col cols="12" align="center">
                <h1 style="text-decoration: underline">Recipe</h1>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-text align="start" class="px-6">
                    <b class="mr-3">Minutes: ~{{ recipe.minutes }}</b
                    ><br />
                    <b class="mr-2"
                      >Ingredients({{ recipe.ingredients.length }}):</b
                    ><span
                      v-for="(ingredient, index) in recipe.ingredients"
                      :key="index"
                    >
                      {{ ingredient }}

                      <span v-if="index != recipe.ingredients.length - 1"
                        >,</span
                      >
                    </span>
                    <v-divider class="my-3"></v-divider>
                    <b class="mr-3">Tags:</b>
                    <v-chip
                      v-for="(tag, index) in recipe.tags.slice(0, 10)"
                      :key="'tag' + index"
                      outlined
                      class="mr-1 my-1"
                      style="pointer-events: none"
                      >{{ tag }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-title class="justify-center"
                    >Description</v-card-title
                  >
                  <v-card-text align="start">{{
                    recipe.description
                  }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-title class="justify-center"
                    >Nutritional Values</v-card-title
                  >
                  <v-card-text align="center"
                    ><b class="mx-6"
                      >Calories: {{ recipe.nutrition.calories }}</b
                    ><b class="mx-6">Protein: {{ recipe.nutrition.protein }}g</b
                    ><b class="mx-6"
                      >Carbs: {{ recipe.nutrition.carbohydrates }}g</b
                    ><b class="mx-6"
                      >Sugar: {{ recipe.nutrition.sugar }}g</b
                    ></v-card-text
                  >
                </v-card>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6" class="ingredient_list">
                  <v-card-title
                    class="justify-center"
                    style="text-decoration: underline"
                    >Instructions</v-card-title
                  >
                  <v-card-subtitle align="center" class="py-0"
                    >({{ recipe.n_steps }} steps)</v-card-subtitle
                  >
                  <v-card-text
                    v-for="(step, index) in recipe.steps"
                    :key="'step' + index"
                    class="text-left pa-0"
                  >
                    <v-list-item> {{ index }}. {{ step }} </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-container else> </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Recipe",
  data() {
    return {
      headers: [
        { text: "Calories", value: "calories" },
        { text: "Protein (g)", value: "protein" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Sugar (g)", value: "sugar" },
        { text: "Minutes", value: "minutes" },
      ],
      recipe: this.$route.params.recipe,
      loadingRecipe: true,
    };
  },
  mounted() {
    this.seedRecipe();
  },

  methods: {
    async seedRecipe() {
      let id = this.$route.params.id;
      if (this.recipe == null) {
        try {
          let recipe = await this.$store.dispatch("getRecipesById", { id: id });
          this.recipe = recipe;
        } catch (e) {
          this.$router.push({
            name: "Error",
            params: { message: e, statusCode: "404" },
          });
        }
      }
      this.loadingRecipe = false;
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
.recipe-container {
  overflow-y: scroll !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  min-height: 100vh !important;
}
</style>
