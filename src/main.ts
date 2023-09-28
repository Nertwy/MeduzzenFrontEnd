import { createApp } from "vue";
import "./style.css";
import AppVue from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import store, { key } from "./store/store";
import { createAuth0 } from "@auth0/auth0-vue";
const app = createApp(AppVue);
app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    },
  })
);
app.use(i18n);
app.use(store, key);
app.mount("#app");
