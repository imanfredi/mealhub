<template>
  <v-card
    elevation="2"
    outlined
    class="d-flex-column recipe_card"
    :to="{ name: 'RecipeDetails', params: { id: recipe.id, recipe: recipe } }"
    style="min-height: 125px !important"
  >
    <v-card-title class="card_text capitalize">{{ recipe.title }}</v-card-title>
    <v-card-subtitle style="text-overflow: ellipsis !important">
      <div class="card_text capitalize">{{ recipe.description }}</div>
    </v-card-subtitle>
    <v-card-text class="d-flex justify-end">
      <b class="mx-1">Calories</b> {{ recipe.nutrition.calories }}
      <b class="mx-1">Protein</b> {{ recipe.nutrition.protein }}g
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
.card_text {
  display: block !important;
  white-space: nowrap !important;
  word-break: normal !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.capitalize::first-letter {
  text-transform: capitalize;
}
</style>
