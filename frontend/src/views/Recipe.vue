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
                    <b class="mr-3">Minutes: ~20</b
                    ><b class="mr-2">Ingredients(4):</b>Eggs, Sugar, Salt,
                    Pepper, Eggs, Sugar, Salt, Pepper, Eggs, Sugar, Salt,
                    Pepper, Eggs, Sugar, Salt, Pepper
                    <v-divider class="my-3"></v-divider>
                    <b class="mr-3">Tags:</b>
                    <v-chip outlined class="mr-1">Easy</v-chip>
                    <v-chip outlined class="mr-1">Fast</v-chip>
                    <v-chip outlined class="mr-1">Amazing</v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-title>Description</v-card-title>
                  <v-card-text align="start"
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero dolores nam ut deserunt, in laborum inventore. Laborum
                    dolores molestiae corporis labore saepe laudantium libero
                    voluptates placeat corrupti, nostrum nesciunt
                    incidunt.</v-card-text
                  >
                </v-card>
              </v-col>
              <v-col cols="12" align="center">
                <v-card color="#FFE8D6">
                  <v-card-title>Nutritional Values</v-card-title>
                  <v-card-text align="center"
                    ><b class="mx-6">Calories: 150</b
                    ><b class="mx-6">Protein: 10g</b
                    ><b class="mx-6">Carbs: 20g</b
                    ><b class="mx-6">Sugar: 2g</b></v-card-text
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
                  <v-card-subtitle align="center">(12 steps)</v-card-subtitle>
                  <v-card-text>
                    <v-list-item> 1.Batir la harina con huevos </v-list-item>
                    <v-list-item> 2. Poner al horno </v-list-item>
                    <v-list-item> 3. Comer </v-list-item>
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
    };
  },
  components: {},
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
