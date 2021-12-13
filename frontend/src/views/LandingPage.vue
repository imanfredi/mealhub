<template>
  <v-container fill-height fluid class="bgImage">
    <v-row>
      <v-col cols="5">
        <v-card width="800px" height="200px" color="#F1FAEE" class="ml-16">
          <v-container fill-height fuild>
            <v-row>
              <v-col cols="12">
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
              <v-col cols="12"> </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card width="800px" height="600px" color="#F1FAEE" class="ml-16">
          <v-card-text> Centered </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
.bgImage {
  background-image: url("../assets/images/background_image.jpg");
  background-size: cover;
}
</style>
