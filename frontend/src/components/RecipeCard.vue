<template>
  <v-card elevation="2" outlined class="d-flex-column grow">
    <v-card-title>Recipe</v-card-title>
    <v-card-subtitle>The best recipe in the world</v-card-subtitle>
    <v-card-text class="d-flex justify-end"
      ><b class="mx-1">Calories</b> 150 <b class="mx-1">Protein</b> 5g
      <b class="mx-1">Carbs</b> 10g <b class="mx-1">Sugar</b> 2g
      <b class="mx-1">Minutes</b> 25</v-card-text
    >
  </v-card>
</template>

<script>
export default {
  name: "RecipeCard",
};
</script>

<style>
.grow {
  transition: all 0.15s ease-in-out;
}
.grow:hover {
  transform: scale(1.01);
  cursor: pointer;
}
</style>
