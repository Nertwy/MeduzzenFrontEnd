import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import AppVue from "./App.vue";
import { authGuard,useAuth0 } from "@auth0/auth0-vue";
// const notLoggedInGuard = (to,from,next)=>{
//   const {isAuthenticated} = useAuth0()
//   if(!isAuthenticated.value){
//     next()
//   }else{
//     next({name:"home"})
//   }
// }
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component:()=> import('./App.vue')
    },
    {
      path: "/about",
      component: () => import("./pages/About.vue"),
    },
    {
      path: "/Register",
      component: () => import("./pages/User_registration.vue"),
      async beforeEnter(to) {
        const result = await authGuard(to)
        return !result
      }
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
