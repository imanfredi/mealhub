<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-card color="#F1FAEE" class="ml-16 pt-5 px-4">
          <v-container fill-height fuild>
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
                  small-chips
                  solo
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex-column align-center">
        <v-card height="600px" color="#F1FAEE">
          <v-container>
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
            <v-row>
              <v-col cols="12">
                <RecipeCard></RecipeCard>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <RecipeCard></RecipeCard>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <RecipeCard></RecipeCard>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import axios from "axios";

export default {
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
      ingredients: [],
    };
  },
  name: "LandingPage",
  components: {
    RecipeCard,
  },

  created() {
    axios
      .get(process.env.VUE_APP_BASE_API_URL + "/recipes")
      .then((response) => {
        this.recipes = response.data;
        console.log(response.headers);

        console.log(response);
      });

    // axios
    //   .get(process.env.VUE_APP_BASE_API_URL + "/ingredients")
    //   .then((response) => {
    //     this.ingredients = response.data;
    //     console.log(response.headers.get("Link"));
    //   });
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
