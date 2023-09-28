import { createRouter, createWebHistory } from "vue-router";
import AppVue from "./App.vue";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppVue,
    },
    {
      path: "/about",
      component: () => import("./pages/About.vue"),
    },
    {
      path: "/Register",
      component: () => import("./pages/User_registration.vue"),
    },
    {
      path: "/callback",
      name: "callback",
      component: () => import("./pages/Callback_Page.vue"),
    },
  ],
});
