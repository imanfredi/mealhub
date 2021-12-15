<template>
  <v-container fill-height fluid class="pa-0" style="overflow-y: scroll">
    <v-row class="ma-0">
      <v-col cols="12" align="center" justify="center">
        <v-card color="#F1FAEE" width="700px" min-height="800px">
          <v-container fill-height fluid>
            <v-row>
              <v-col cols="12" align="center">
                <h1 style="text-decoration: underline">Recipe</h1>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-text align="start" class="px-6">
                    <b class="mr-3">Minutes: ~{{ recipe.minutes }}</b
                    ><b class="mr-2"
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
                      v-for="(tag, index) in recipe.tags"
                      :key="index"
                      outlined
                      class="mr-1"
                      >{{ tag }}</v-chip
                    >
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-title>Description</v-card-title>
                  <v-card-text align="start">{{
                    recipe.description
                  }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-title>Nutritional Values</v-card-title>
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
                  <v-card-subtitle align="center"
                    >({{ recipe.n_steps }} steps)</v-card-subtitle
                  >
                  <v-card-text
                    v-for="(step, index) in recipe.steps"
                    :key="index"
                  >
                    <v-list-item> {{ index }}. {{ step }} </v-list-item>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
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
    };
  },
  mounted() {
    this.seedRecipe();
  },

  methods: {
    async seedRecipe() {
      (this.recipe);
      let id = this.$route.params.id;
      if (this.recipe == null) {
        console.log("aaa");
        let recipe = await this.$store.dispatch("getRecipesById", { id: id });
        this.recipe = recipe;
      }
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
