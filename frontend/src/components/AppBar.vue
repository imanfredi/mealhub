<template>
  <v-app-bar app clipped-left color="#A8DADC" height="62px">
    <v-row align="center">
      <v-col cols="4" class="d-flex justify-start pl-4">
        <router-link
          to="/?page=0&pageSize=3&ingredients=&notIngredients=&queryName=meat&orderBy=LESS_CALORIES"
        >
          <span style="cursor: pointer"><strong>MealHub</strong></span>
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

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
