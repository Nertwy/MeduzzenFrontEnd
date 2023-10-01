import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import AppVue from "./App.vue";
import { RouteLocation } from "vue-router";
import useStoreTyped, { store, storeInitializer } from "./store/store";

const authGuard = ()=>{
  
}
const authGuardReverse = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const user = store.state.user
  if(!user) next()
  else next("about")

};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./pages/MainPage.vue"),
    },
    {
      name: "about",
      path: "/about",
      component: () => import("./pages/About.vue"),
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import("./pages/User_registration.vue"),
      beforeEnter: authGuardReverse,
    },
    {
      path: "/Auth",
      name: "Authorization",
      component: () => import("./pages/User_authorization.vue"),
      beforeEnter: authGuardReverse,
    },
    {
      path: "/callback",
      name: "callback",
      component: () => import("./pages/Callback_Page.vue"),
    },
    {
      path: "/Users_List",
      name: "List_of_users",
      beforeEnter: authGuard,
      component: () => import("./pages/List_of_users.vue"),
    },
    {
      path: "/Companies_List",
      name: "List_of_companies",
      beforeEnter: authGuard,
      component: () => import("./pages/List_of_companies.vue"),
    },
    {
      path: "/Companies_List",
      name: "List_of_companies",
      beforeEnter: authGuard,
      component: () => import("./pages/List_of_companies.vue"),
    },
    {
      path: "/Company_profile",
      name: "Company_profile",
      beforeEnter: authGuard,
      component: () => import("./pages/Company_profie.vue"),
    },
  ],
});
export default router;
