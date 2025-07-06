<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/store/cartStore";

// Initialize cart store
const cartStore = useCartStore();

// Local state for cart visibility
const isCartOpen = ref(false);

// Computed properties
const cartItems = computed(() => cartStore.getCartItems);
const cartItemCount = computed(() => cartStore.getCartItemCount);
const totalCartPrice = computed(() => cartStore.getTotalCartPrice);
const isCartVisible = computed(() => cartItemCount.value > 0);

// Methods
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};

const clearCart = () => {
  cartStore.clearCart();
  isCartOpen.value = false;
};

const updateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) {
    cartStore.removeFromCart(productId);
  } else {
    const item = cartItems.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
    }
  }
};
</script>

<template>
  <!-- Floating Cart Container -->
  <div
    v-if="isCartVisible"
    class="fixed bottom-22 right-6 z-50 transition-all duration-300 ease-in-out"
  >
    <!-- Cart Icon with Badge -->
    <div class="relative">
      <button
        class="bg-light-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-light-blue-800 transition-colors duration-200"
        @click="toggleCart"
      >
        <!-- Shopping Cart Icon (Heroicons solid) -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z"
          />
        </svg>

        <!-- Item Count Badge -->
        <span
          v-if="cartItemCount > 0"
          class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
        >
          {{ cartItemCount }}
        </span>
      </button>
    </div>

    <!-- Cart Details Panel -->
    <div
      v-if="isCartOpen"
      class="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 flex flex-col"
    >
      <!-- Cart Header -->
      <div
        class="bg-light-blue-900 text-white p-4 flex items-center justify-between flex-shrink-0"
      >
        <h3 class="font-semibold">Shopping Cart</h3>
        <button
          @click="clearCart"
          class="text-sm hover:text-pink-200 transition-colors"
        >
          Clear All
        </button>
      </div>

      <!-- Cart Items -->
      <div class="flex-1 overflow-y-auto min-h-0">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="p-4 border-b border-gray-100 flex items-center gap-3"
        >
          <!-- Item Image -->
          <img
            :src="item.image"
            :alt="item.name"
            class="w-12 h-12 object-cover rounded"
          />

          <!-- Item Details -->
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm text-gray-900 truncate">
              {{ item.name }}
            </h4>
            <p class="text-sm text-pink-900 font-semibold">
              ₦{{ item.price.toLocaleString() }}
            </p>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center gap-2">
            <button
              @click="updateQuantity(item.id, item.quantity - 1)"
              class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              -
            </button>
            <span class="text-sm font-medium w-8 text-center">
              {{ item.quantity }}
            </span>
            <button
              @click="updateQuantity(item.id, item.quantity + 1)"
              class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <!-- Remove Button -->
          <button
            @click="removeFromCart(item.id)"
            class="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Cart Footer -->
      <div class="p-4 bg-gray-50 flex-shrink-0">
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold text-gray-900">Total:</span>
          <span class="font-bold text-lg text-pink-900">
            ₦{{ totalCartPrice.toLocaleString() }}
          </span>
        </div>

        <button
          class="w-full bg-light-blue-900 text-white py-2 px-4 rounded-lg hover:bg-light-blue-800 transition-colors duration-200 font-medium"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for cart items */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
