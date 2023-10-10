import { createApp } from "vue";
import "./style.css";
import AppVue from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { key,store } from "./store/store";
const app = createApp(AppVue);
app.use(store, key);
app.use(router);
app.use(i18n);
app.mount("#app");
    