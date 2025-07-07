// Booking Store
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useBookingStore = defineStore("booking", {
  state: () => ({
    slots: [],
    bookings: [],
    isLoading: false,
    error: null,
    bookingSuccess: false,
    bookingError: null,
  }),

  getters: {
    getSlots: (state) => state.slots,
    getBookings: (state) => state.bookings,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getBookingSuccess: (state) => state.bookingSuccess,
    getBookingError: (state) => state.bookingError,
  },

  actions: {
    async fetchSlots() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.get(`${API_URL}/api/bookings/slots`);
        this.slots = response.data.data || response.data;
        return this.slots;
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch slots";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchBookings() {
      try {
        this.isLoading = true;
        this.error = null;
        const response = await axios.get(`${API_URL}/api/bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        this.bookings = response.data.data || response.data;
        return this.bookings;
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to fetch bookings";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async bookAppointment({ slotId, name, email, phone }) {
      try {
        this.isLoading = true;
        this.bookingError = null;
        this.bookingSuccess = false;
        const response = await axios.post(`${API_URL}/api/bookings/book`, {
          slotId,
          name,
          email,
          phone,
        });
        this.bookingSuccess = true;
        return response.data.data || response.data;
      } catch (error) {
        this.bookingError =
          error.response?.data?.message || "Failed to book appointment";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    clearBookingStatus() {
      this.bookingSuccess = false;
      this.bookingError = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookingStore, import.meta.hot));
}
