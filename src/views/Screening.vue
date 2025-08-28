<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <!-- Show selected tests summary -->
    <div v-if="selectedTests.length" class="mb-4">
      <div
        v-for="test in selectedTests"
        :key="test.id"
        class="mb-2 flex justify-between items-center"
      >
        <span>{{ test.name }}</span>
        <span>₦{{ test.price.toLocaleString() }}</span>
      </div>
      <div class="font-bold mt-2 flex justify-between items-center">
        <span>Total:</span>
        <span>₦{{ totalTestPrice.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Show bank details and message after payment -->
    <div
      v-if="showBankDetails"
      class="mt-8 bg-pink-50 border border-pink-200 rounded-lg p-6"
    >
      <h2 class="text-lg font-semibold mb-2">Bank Details</h2>
      <div class="mb-2">
        <strong>Screening Ref No.:</strong> {{ screeningRefNo }}
      </div>
      <div class="mb-2">
        <strong>Screening Price:</strong> ₦
        {{
          screeningForm.value.price.toLocaleString() ||
          totalTestPrice.toLocaleString()
        }}
      </div>
      <div class="mb-2">
        <strong>Account Name:</strong> {{ bankDetails.accountName }}
      </div>
      <div class="mb-2">
        <strong>Account Number:</strong> {{ bankDetails.accountNumber }}
      </div>
      <div class="mb-2">
        <strong>Bank Name:</strong> {{ bankDetails.bankName }}
      </div>
      <div class="mt-4 text-pink-700 font-medium">
        After payment we will confirm your transfer and let you know when and
        where your screening will be carried out.
      </div>
    </div>

    <!-- Checkout Form -->
    <form
      v-if="!showBankDetails"
      @submit.prevent="handleCheckout"
      class="mt-6 space-y-4"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Email *</label
        >
        <input
          v-model="screeningForm.email"
          type="email"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="your@email.com"
          autocomplete="email"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Phone Number *</label
        >
        <input
          v-model="screeningForm.phone_number"
          type="tel"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="+234 123 456 7890"
          autocomplete="tel"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Name *</label
        >
        <input
          v-model="screeningForm.name"
          type="text"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Your Name"
          autocomplete="name"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >City *</label
        >
        <input
          v-model="screeningForm.city"
          type="text"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Your City"
          autocomplete="address-level2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >State *</label
        >
        <input
          v-model="screeningForm.state"
          type="text"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Your State"
          autocomplete="address-level1"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Tests *</label
        >
        <div class="space-y-2">
          <div
            v-for="test in screeningTests"
            :key="test.id"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :id="'test-' + test.id"
              :value="test.id"
              v-model="screeningForm.tests"
              class="mr-2"
            />
            <label :for="'test-' + test.id" class="cursor-pointer">
              {{ test.name }} - ₦{{ test.price.toLocaleString() }}
            </label>
          </div>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Price *</label
        >
        <input
          v-model="screeningForm.price"
          type="number"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="₦0"
          readonly
        />
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
        :disabled="isProcessing || selectedTests.length === 0"
      >
        <span v-if="isProcessing">Processing...</span>
        <span v-else>Pay Now</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useScreeningStore } from "@/store/screeningStore";

const screeningStore = useScreeningStore();

// Generate Screening Ref No.
const generateScreeningRef = () => {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
  const timeStr = `${now.getHours().toString().padStart(2, "0")}${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;
  return `MedVax-Screening-${dateStr}${timeStr}`;
};

const screeningRefNo = ref("");

onMounted(() => {
  screeningRefNo.value = generateScreeningRef();
  screeningForm.value.screeningRefNo = screeningRefNo.value;
});

const bankDetails = ref({
  accountName: "MedVax Healthcare LTD",
  accountNumber: "1310254460",
  bankName: "Zenith Bank",
});

const screeningTests = ref([
  {
    id: 1,
    name: "HIV and STI Screening",
    description: "Confidential HIV and STI screening and counseling.",
    price: 5000,
  },
  {
    id: 2,
    name: "Pap Smear Test",
    description: "Screening test for cervical cancer.",
    price: 3000,
  },
  {
    id: 3,
    name: "HPV Test",
    description: "Screening test for human papillomavirus (HPV).",
    price: 4000,
  },
  {
    id: 4,
    name: "Mammogram",
    description: "X-ray screening for breast cancer.",
    price: 8000,
  },
  {
    id: 5,
    name: "Clinical Breast Exam",
    description: "Physical examination of the breasts.",
    price: 2000,
  },
  {
    id: 6,
    name: "Colonoscopy",
    description: "Screening test for colon cancer.",
    price: 10000,
  },
  {
    id: 7,
    name: "Hepatitis B & C Screening / Immunity Test",
    description: "Screening for Hepatitis B and C viruses.",
    price: 12000,
  },
  {
    id: 8,
    name: "Hormonal Profiling Test",
    description: "Test to assess hormonal levels in the body.",
    price: 7000,
  },
]);

const screeningForm = ref({
  email: "",
  phone_number: "",
  name: "",
  city: "",
  state: "",
  tests: [],
  price: 0,
  screeningRefNo: "", // Add ref no to form
});

const selectedTests = ref([]);
const totalTestPrice = ref(0);
const showBankDetails = ref(false);
const isProcessing = ref(false);
const errorMsg = ref("");

// Watch for changes in selected test IDs and update selectedTests and price
watch(
  () => screeningForm.value.tests,
  (testIds) => {
    selectedTests.value = screeningTests.value.filter((test) =>
      testIds.includes(test.id)
    );
    totalTestPrice.value = selectedTests.value.reduce(
      (total, test) => total + test.price,
      0
    );

    screeningForm.value.price = totalTestPrice.value;
  },
  { immediate: true }
);

const handleCheckout = async () => {
  errorMsg.value = "";
  if (
    !screeningForm.value.email ||
    !screeningForm.value.phone_number ||
    !screeningForm.value.name ||
    !screeningForm.value.city ||
    !screeningForm.value.state ||
    selectedTests.value.length === 0
  ) {
    errorMsg.value = "Please fill in all required fields.";
    return;
  }
  isProcessing.value = true;
  screeningForm.value.screeningRefNo = screeningRefNo.value;
  screeningForm.value.tests = Array.from(
    selectedTests.value,
    (test) => test.name
  );
  await screeningStore
    .createScreening(screeningForm.value)
    .then(() => {
      isProcessing.value = false;
      showBankDetails.value = true;
    })
    .catch((error) => {
      isProcessing.value = false;
      errorMsg.value =
        error.response?.data?.message || "Failed to create screening.";
    });
  // setTimeout(() => {
  //   isProcessing.value = false;
  //   showBankDetails.value = true;
  // }, 2000); // Simulate payment processing delay
};
</script>
