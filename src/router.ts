import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";

import { store } from "./store/store";

const authGuardReverse = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const user = store.state.user;
  if (!user) next();
  else next("about");
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
      component: () => import("./pages/UserRegistration.vue"),
      beforeEnter: authGuardReverse,
    },
    {
      path: "/Auth",
      name: "Authorization",
      component: () => import("./pages/UserAuthorization.vue"),
      beforeEnter: authGuardReverse,
    },
    {
      path: "/callback",
      name: "callback",
      component: () => import("./pages/CallbackPage.vue"),
    },
    {
      path: "/Users_List",
      name: "List_of_users",
      meta: { requiresAuth: true },
      component: () => import("./pages/ListOfUsers.vue"),
    },
    {
      path: "/Companies_List",
      name: "List_of_companies",
      meta: { requiresAuth: true },
      component: () => import("./pages/ListOfCompanies.vue"),
    },

    {
      path: "/Company_profile/:id/",
      name: "Company_profile",
      meta: { requiresAuth: true },
      component: () => import("./pages/CompanyProfie.vue"),
    },
  ],
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      next({ path: "/Auth" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
