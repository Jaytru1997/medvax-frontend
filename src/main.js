import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@/assets/css/tailwind.css";

const pinia = createPinia();
const app = createApp(App);

// pinia config
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);
app.mount("#app");
