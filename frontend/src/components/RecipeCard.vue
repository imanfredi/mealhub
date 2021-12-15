<template>
  <v-card
    elevation="2"
    outlined
    class="d-flex-column recipe_card"
    to="/recipes/3"
  >
    <v-card-title>{{ recipe._title }}</v-card-title>
    <v-card-subtitle style="text-overflow: ellipsis !important">
      <div class="description_text">{{ recipe._description }}</div>
    </v-card-subtitle>
    <v-card-text class="d-flex justify-end">
      <b class="mx-1">Calories</b> {{ recipe._nutrition.calories }}g
      <b class="mx-1">Protein</b> {{ recipe._nutrition.calories }}g
      <b class="mx-1">Carbs</b> {{ recipe._nutrition.carbohydrates }}g
      <b class="mx-1">Sugar</b> {{ recipe._nutrition.sugar }}g
      <b class="mx-1">Minutes</b> {{ recipe._minutes }}
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
