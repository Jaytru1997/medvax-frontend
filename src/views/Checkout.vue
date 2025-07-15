<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <!-- Show cart summary here -->
    <div
      v-for="item in cartItems"
      :key="item.id"
      class="mb-2 flex justify-between items-center"
    >
      <span>{{ item.name }} x{{ item.quantity }}</span>
      <span>₦{{ (item.price * item.quantity).toLocaleString() }}</span>
    </div>
    <div class="font-bold mt-4 flex justify-between items-center">
      <span>Total:</span>
      <span>₦{{ totalCartPrice.toLocaleString() }}</span>
    </div>
    <button
      class="mt-6 w-full bg-pink-700 text-white py-3 rounded-lg font-semibold"
      @click="handleCheckout"
      :disabled="isProcessing || cartItems.length === 0"
    >
      <span v-if="isProcessing">Processing...</span>
      <span v-else>Pay Now</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "@/store/cartStore";
import { usePaymentStore } from "@/store/paymentStore";

const cartStore = useCartStore();
const paymentStore = usePaymentStore();
const cartItems = cartStore.getCartItems;
const totalCartPrice = cartStore.getTotalCartPrice;
const isProcessing = ref(false);

const handleCheckout = async () => {
  isProcessing.value = true;
  try {
    const paymentData = {
      items: cartItems,
      total: totalCartPrice,
      // Add user info if needed
    };
    const result = await paymentStore.createPaymentLink(paymentData);
    if (result && result.url) {
      window.location.href = result.url;
    } else {
      alert("Payment link could not be created.");
    }
  } catch (e) {
    alert("Failed to initiate payment.");
  } finally {
    isProcessing.value = false;
  }
};
</script>
