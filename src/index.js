import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);
app.use(router).mount("#app");
