// Team Store
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useScreeningStore = defineStore("screening", {
  state: () => ({
    screeningData: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getScreeningData: (state) => state.screeningData,
    getUnscheduledScreenings: (state) =>
      state.screeningData.filter((screening) => !screening.isApproved),
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getScreeningById: (state) => (id) =>
      state.screeningData.find((screening) => screening?._id === id),
    getScreeningCount: (state) => state.screeningData.length,
  },

  actions: {
    // Fetch all team members
    async fetchScreeningData() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_URL}/api/screening`);
        this.screeningData = response.data.data || response.data;
      } catch (error) {
        console.error("Error fetching screening data:", error);
        this.error =
          error.response?.data?.message || "Failed to fetch screening data";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Register for screening
    async createScreening(screeningData) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(
          `${API_URL}/api/screening`,
          screeningData,
          {
            headers: {
              //   Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              ...(screeningData instanceof FormData
                ? { "Content-Type": "multipart/form-data" }
                : {}),
            },
          }
        );
      } catch (error) {
        console.error("Error creating screening:", error);
        this.error =
          error.response?.data?.message || "Failed to create screening";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Update screening
    async updateScreening(id, screeningData) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.put(
          `${API_URL}/api/screening/${id}`,
          screeningData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              ...(screeningData instanceof FormData
                ? { "Content-Type": "multipart/form-data" }
                : {}),
            },
          }
        );

        // Update in local state
        const updatedScreening = response.data.data || response.data;
        const index = this.screeningData.findIndex(
          (screening) => screening._id === id || screening.id === id
        );
        if (index !== -1) {
          this.screeningData[index] = updatedScreening;
        }
      } catch (error) {
        console.error("Error updating screening:", error);
        this.error =
          error.response?.data?.message || "Failed to update screening";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Delete screening
    async deleteScreening(id) {
      try {
        this.isLoading = true;
        this.error = null;

        await axios.delete(`${API_URL}/api/screening/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        // Remove from local state
        this.screeningData = this.screeningData.filter(
          (screening) => screening._id !== id && screening.id !== id
        );
      } catch (error) {
        console.error("Error deleting screening:", error);
        this.error =
          error.response?.data?.message || "Failed to delete screening";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Clear error
    clearError() {
      this.error = null;
    },
  },
});

// Hot Module Replacement (HMR) for the team store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScreeningStore, import.meta.hot));
}
