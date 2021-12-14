import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: () => import("../layouts/DefaultLayout"),
    children: [
      {
        path: "",
        name: "landingPage",
        component: () => import("../views/LandingPage"),
      },
      {
        path: "recipes/:id",
        name: "recipe",
        component: () => import("../views/Recipe"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
