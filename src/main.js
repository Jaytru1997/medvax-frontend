import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";
import axios from "axios";
import { useAuthStore } from "./store/authStore";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize auth store
const authStore = useAuthStore();
authStore.initializeAuth();

// Set up axios defaults
const API_URL = import.meta.env.VITE_API_URL;
if (API_URL) {
  axios.defaults.baseURL = API_URL;
}

// Add auth token to requests if available
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      authStore.logout();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

app.mount("#app");
