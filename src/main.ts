import { createApp } from "vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";

import App from "./App.vue";

import "./assets/css/main.scss";

const app = createApp(App);
app.use(router);
app.use(ToastPlugin, {
  position: "top",
});
app.mount("#app");
