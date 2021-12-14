<template>
  <v-container>
    <recipe-details></recipe-details>
  </v-container>
</template>

<script>
import RecipeDetails from "../components/RecipeDetail.vue";

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
    };
  },
  components: {
    RecipeDetails,
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
