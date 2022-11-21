import "./style.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(createHead());
app.mount("#root");
