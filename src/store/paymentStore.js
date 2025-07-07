// Payment Store
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    paymentLink: null,
    isLoading: false,
    error: null,
    paymentStatus: null,
  }),

  getters: {
    getPaymentLink: (state) => state.paymentLink,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getPaymentStatus: (state) => state.paymentStatus,
  },

  actions: {
    // Create payment link
    async createPaymentLink(paymentData) {
      try {
        this.isLoading = true;
        this.error = null;
        this.paymentStatus = null;

        const response = await axios.post(
          `${API_URL}/api/payments/create-link`,
          paymentData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.paymentLink = response.data;
        return response.data;
      } catch (error) {
        console.error("Error creating payment link:", error);
        this.error =
          error.response?.data?.message || "Failed to create payment link";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Process payment callback
    async processPaymentCallback(callbackData) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_URL}/api/payments/callback`, {
          params: callbackData,
        });

        this.paymentStatus = response.data;
        return response.data;
      } catch (error) {
        console.error("Error processing payment callback:", error);
        this.error =
          error.response?.data?.message || "Failed to process payment";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Clear payment data
    clearPayment() {
      this.paymentLink = null;
      this.error = null;
      this.paymentStatus = null;
    },

    // Clear error
    clearError() {
      this.error = null;
    },
  },
});

// Hot Module Replacement (HMR) for the payment store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot));
}
