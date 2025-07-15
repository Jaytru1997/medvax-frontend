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

    <!-- Checkout Form -->
    <form @submit.prevent="handleCheckout" class="mt-6 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Email *</label
        >
        <input
          v-model="checkoutForm.email"
          type="email"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Phone Number *</label
        >
        <input
          v-model="checkoutForm.phone_number"
          type="tel"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="+234 123 456 7890"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Delivery Address</label
        >
        <textarea
          v-model="checkoutForm.address"
          rows="3"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Enter your delivery address"
        ></textarea>
      </div>
      <div
        v-if="errorMsg"
        class="bg-red-50 border border-red-200 rounded-lg p-3"
      >
        <p class="text-red-600 text-sm">{{ errorMsg }}</p>
      </div>
      <button
        class="w-full bg-pink-700 text-white py-3 rounded-lg font-semibold"
        type="submit"
        :disabled="isProcessing || cartItems.length === 0"
      >
        <span v-if="isProcessing">Processing...</span>
        <span v-else>Pay Now</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cartStore";
import { usePaymentStore } from "@/store/paymentStore";

const cartStore = useCartStore();
const paymentStore = usePaymentStore();
const cartItems = cartStore.getCartItems;
const totalCartPrice = cartStore.getTotalCartPrice;
const isProcessing = ref(false);
const errorMsg = ref("");

const checkoutForm = ref({
  email: "",
  phone_number: "",
  address: "",
});

const router = useRouter();

// Redirect if cart is empty on mount
onMounted(() => {
  if (!cartItems.length) {
    router.replace("/e-pharmacy");
  }
});

// Watch for cart becoming empty
watch(
  () => cartItems.length,
  (newLength) => {
    if (newLength === 0) {
      router.replace("/e-pharmacy");
    }
  }
);

const handleCheckout = async () => {
  errorMsg.value = "";
  if (!checkoutForm.value.email || !checkoutForm.value.phone_number) {
    errorMsg.value = "Please fill in all required fields.";
    return;
  }
  isProcessing.value = true;
  try {
    const paymentData = {
      amount: totalCartPrice,
      email: checkoutForm.value.email,
      phone_number: checkoutForm.value.phone_number,
      address: checkoutForm.value.address,
      description: `Order for ${
        cartItems.length
      } items - Total: ₦${totalCartPrice.toLocaleString()}`,
      items: cartItems,
    };
    const result = await paymentStore.createPaymentLink(paymentData);
    if (result && (result.url || result.payment_link)) {
      window.location.href = result.url || result.payment_link;
    } else {
      errorMsg.value = "Payment link could not be created.";
    }
  } catch (e) {
    errorMsg.value = "Failed to initiate payment.";
  } finally {
    isProcessing.value = false;
  }
};
</script>
