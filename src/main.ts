import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";

import App from "./App.vue";
const pinia = createPinia();

import "./assets/css/main.scss";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ToastPlugin, {
  position: "top",
});
app.mount("#app");
