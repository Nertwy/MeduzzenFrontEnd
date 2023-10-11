import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";

import useStoreTyped, { store, storeInitializer } from "./store/store";

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
      component: () => import("./pages/User_registration.vue"),
      beforeEnter: authGuardReverse,
    },
    {
      path: "/Login",
      name: "Login",
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
      meta: { requiresAuth: true },
      component: () => import("./pages/List_of_users.vue"),
    },
    {
      path: "/Companies_List",
      name: "List_of_companies",
      meta: { requiresAuth: true },
      component: () => import("./pages/List_of_companiesV2.vue"),
    },
    {
      path: "/Company_profile/:id/",
      name: "Company_profile",
      meta: { requiresAuth: true },
      component: () => import("./pages/Company_profie.vue"),
    },
    {
      path:"/Invitations",
      name:"Invitations",
      component:()=>import("@/pages/Actions_Page.vue")
    }
  ],
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // User is not authenticated, redirect to login page
      next({ path: "/Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
