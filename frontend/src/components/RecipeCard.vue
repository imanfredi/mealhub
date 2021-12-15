<template>
  <v-card
    elevation="2"
    outlined
    class="d-flex-column recipe_card"
    :to="{ name: 'RecipeDetails', params: { id: recipe.id, recipe: recipe } }"
  >
    <v-card-title>{{ recipe.title }}</v-card-title>
    <v-card-subtitle style="text-overflow: ellipsis !important">
      <div class="description_text">{{ recipe.description }}</div>
    </v-card-subtitle>
    <v-card-text class="d-flex justify-end">
      <b class="mx-1">Calories</b> {{ recipe.nutrition.calories }}
      <b class="mx-1">Protein</b> {{ recipe.nutrition.calories }}g
      <b class="mx-1">Carbs</b> {{ recipe.nutrition.carbohydrates }}g
      <b class="mx-1">Sugar</b> {{ recipe.nutrition.sugar }}g
      <b class="mx-1">Minutes</b> {{ recipe.minutes }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RecipeCard",
  props: ["recipe"],
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
.description_text {
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recipe_card {
  height: 130px;
}
</style>
