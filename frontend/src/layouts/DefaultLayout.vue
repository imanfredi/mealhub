<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <v-fade-transition appear>
        <v-container fill-height fluid class="bgImage">
          <router-view></router-view>
        </v-container>
      </v-fade-transition>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";

export default {
  name: "DefaultLayout",
  components: {
    AppBar,
    Footer,
  },
};
</script>
