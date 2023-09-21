import { createApp } from "vue";
import "./style.css";
import AppVue from "./App.vue";
import router from "./router";
import i18n from './i18n'
const app = createApp(AppVue);
app.use(i18n);
app.use(router);
app.mount("#app");
