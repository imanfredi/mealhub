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
        name: "LandingPage",
        component: () => import("../views/LandingPage"),
      },
      {
        name: "RecipeDetails",
        path: "/recipes/:id",
        props: (route) => ({
          recipe: route.params.recipe,
        }),
        component: () => import("../views/Recipe"),
      },
      {
        name: "Error",
        path: "*",
        props: (route) => ({
          message: route.params.message || "Not found",
          statusCode: route.params.statusCode || 404,
        }),
        component: () => import("../views/Error"),
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
