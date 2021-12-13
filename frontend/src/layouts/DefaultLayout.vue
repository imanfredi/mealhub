<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <v-fade-transition appear>
        <router-view></router-view>
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
