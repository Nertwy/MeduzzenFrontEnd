import { createRouter, createWebHistory } from "vue-router";
import AppVue from "./App.vue";

export default createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            component:AppVue
        },
        {
            path:'/about',
            component:()=> import('./pages/About.vue')
        }
    ]
})