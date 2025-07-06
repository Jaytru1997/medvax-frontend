// Shopping Cart Store
import { defineStore, acceptHMRUpdate } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    getCartItems: (state) => state.cartItems,
    getCartItemCount: (state) => state.cartItems.length,
    getTotalCartPrice: (state) =>
      state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        this.cartItems.push({ ...product, quantity: product.quantity });
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.cartItems = [];
    },
  },
});
// Hot Module Replacement (HMR) for the cart store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
