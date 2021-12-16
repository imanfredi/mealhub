<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card light color="#F1FAEE" class="pa-5" elevation="5">
          <v-img
            src="../assets/images/Error.png"
            :max-height="this.$vuetify.breakpoint.smAndDown ? '120' : '180'"
            contain
          />
          <h1 class="text-center text-h5 text-md-h3 font-weight-bold mb-5">
            Ooops... Error {{ statusCode }}
          </h1>
          <h2 class="text-center text-h6 text-md-h4 font-weight-medium my-5">
            {{ message }}
          </h2>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ErrorPage",
  props: ["message", "statusCode"],
};
</script>

<style>
.bgImage {
  background-image: url("../assets/images/background_image.jpg");
  background-size: cover;
}

.errorImage {
  display: flex;
  justify-content: center;
}
</style>
