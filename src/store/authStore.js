// Authentication Store
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("auth_token") || null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUserRole: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === "admin",
    isManager: (state) => state.user?.role === "manager",
  },

  actions: {
    // Register user
    async register(userData) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(
          `${API_URL}/api/auth/register`,
          userData
        );

        // Auto-login after successful registration
        await this.login({
          email: userData.email,
          password: userData.password,
        });

        return response.data;
      } catch (error) {
        console.error("Registration error:", error);
        this.error = error.response?.data?.message || "Registration failed";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Login user
    async login(credentials) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(
          `${API_URL}/api/auth/login`,
          credentials
        );

        const { token, data } = response.data;

        // Store token and user data
        this.token = token;
        this.user = data;
        this.isAuthenticated = true;

        // Save token and user to localStorage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(data));

        // Set default auth header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return response.data;
      } catch (error) {
        console.error("Login error:", error);
        this.error = error.response?.data?.message || "Login failed";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Logout user
    async logout() {
      try {
        if (this.token) {
          await axios.get(`${API_URL}/api/auth/logout`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
        }
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Clear state regardless of API call success
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        delete axios.defaults.headers.common["Authorization"];
      }
    },

    // Initialize auth state from localStorage
    initializeAuth() {
      const token = localStorage.getItem("auth_token");
      const user = localStorage.getItem("auth_user");
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // You might want to validate the token with the backend here
        // For now, we'll assume the token is valid
      }
    },

    // Clear error
    clearError() {
      this.error = null;
    },
  },
});

// Hot Module Replacement (HMR) for the auth store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
