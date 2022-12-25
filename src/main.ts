import "./style.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(createHead());
app.mount("#root");
