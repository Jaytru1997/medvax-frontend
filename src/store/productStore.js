import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getProducts: (state) => state.products,
    getProductById: (state) => (id) =>
      state.products.find((product) => product._id === id || product.id === id),
    getProductByName: (state) => (name) =>
      state.products.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      ),
    getProductByPriceRange: (state) => (minPrice, maxPrice) =>
      state.products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      ),
    getProductByCategory: (state) => (category) =>
      state.products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      ),
    getProductCount: (state) => state.products.length,
    getTotalProductPrice: (state) =>
      state.products.reduce((total, product) => total + product.price, 0),
    getProductImages: (state) => state.products.map((product) => product.image),
    getProductNames: (state) => state.products.map((product) => product.name),
    getProductPrices: (state) => state.products.map((product) => product.price),
    getProductIds: (state) =>
      state.products.map((product) => product._id || product.id),
    getProductDetails: (state) => (id) => {
      const product = state.products.find(
        (product) => product._id === id || product.id === id
      );
      return product
        ? {
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category || "General",
            description: product.description,
          }
        : null;
    },
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
  },

  actions: {
    // Fetch all products (medications)
    async fetchProducts() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_URL}/api/medications`);
        this.products = response.data;
        return this.products;
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error =
          error.response?.data?.message || "Failed to fetch products";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Fetch a single product by ID
    async fetchProductById(id) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_URL}/api/medications/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
        this.error = error.response?.data?.message || "Failed to fetch product";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Add a new product (admin only)
    async addProduct(productData, token) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(
          `${API_URL}/api/medications`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Add the new product to the state
        this.products.unshift(response.data);
        return response.data;
      } catch (error) {
        console.error("Error adding product:", error);
        this.error = error.response?.data?.message || "Failed to add product";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Update a product (admin only)
    async updateProduct(id, productData, token) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.put(
          `${API_URL}/api/medications/${id}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Update the product in the state
        const index = this.products.findIndex(
          (product) => product._id === id || product.id === id
        );
        if (index !== -1) {
          this.products[index] = response.data;
        }

        return response.data;
      } catch (error) {
        console.error("Error updating product:", error);
        this.error =
          error.response?.data?.message || "Failed to update product";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Delete a product (admin only)
    async deleteProduct(id, token) {
      try {
        this.isLoading = true;
        this.error = null;

        await axios.delete(`${API_URL}/api/medications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Remove the product from the state
        this.products = this.products.filter(
          (product) => product._id !== id && product.id !== id
        );
        return true;
      } catch (error) {
        console.error("Error deleting product:", error);
        this.error =
          error.response?.data?.message || "Failed to delete product";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Clear error
    clearError() {
      this.error = null;
    },

    // Clear products
    clearProducts() {
      this.products = [];
    },
  },
});

// Hot Module Replacement (HMR) for the product store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
