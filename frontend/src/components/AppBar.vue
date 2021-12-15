<template>
  <v-app-bar app clipped-left color="#A8DADC" height="62px">
    <v-row align="center">
      <v-col cols="4" class="d-flex justify-start pl-4">
        <router-link to="/" style="text-decoration:none;">
        <span style="cursor: pointer;">MealHub</span>
        </router-link>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
};
</script>
