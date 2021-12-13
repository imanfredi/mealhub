<template>
  <v-footer flat tile width="100%" class="text-center" color="#A8DADC">
    <v-card-text color="#1D3557">
      {{ new Date().getFullYear() }} — <strong>MealHub</strong>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
