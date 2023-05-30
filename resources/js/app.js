import "./bootstrap";
import { createApp } from "vue";
import axios from "axios";
import { createPinia } from "pinia";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL;

let pinia = createPinia();

import App from "./App.vue";
import router from "./route";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
