<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Tests Checkout</h1>
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
    <div v-else>
      <p class="text-gray-600">
        Select tests from the available options below.
      </p>
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
        <div class="space-y-4">
          <div
            v-for="category in screeningCategories"
            :key="category.id"
            class="border rounded-lg p-3 bg-white shadow-sm"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  :id="'cat-' + category.id"
                  :checked="isCategorySelected(category)"
                  @change="toggleCategorySelection(category)"
                  class="h-4 w-4 text-pink-600 border-gray-300 rounded mr-3"
                />
                <label
                  :for="'cat-' + category.id"
                  class="font-semibold text-sm"
                  >{{ category.name }}</label
                >
                <span
                  v-if="isCategoryPartiallySelected(category)"
                  class="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded"
                  >Partial</span
                >
              </div>
              <div class="text-sm text-gray-600 flex items-center">
                <span class="mr-2">{{ category.tests.length }} tests</span>
                <svg
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-2">
              <div
                v-for="test in category.tests"
                :key="test.id"
                class="flex items-center justify-between p-2 rounded hover:bg-gray-50 border-b last:border-b-0"
              >
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    :id="'test-' + test.id"
                    :value="test.id"
                    v-model="screeningForm.tests"
                    class="h-4 w-4 text-pink-600 border-gray-300 rounded mr-3"
                  />
                  <label
                    :for="'test-' + test.id"
                    class="cursor-pointer text-sm text-gray-800"
                  >
                    {{ test.name }}
                  </label>
                </div>
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-800"
                    >₦{{ test.price.toLocaleString() }}</span
                  >
                </div>
              </div>
            </div>
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

// Grouped screening categories and tests (IDs are unique)
const screeningCategories = ref([
  {
    id: "hematology",
    name: "HEMATOLOGY",
    tests: [
      { id: 1001, name: "Full blood count", price: 9000 },
      { id: 1002, name: "Packed cell volume (PCV)", price: 4500 },
      { id: 1003, name: "Genotype", price: 6000 },
      { id: 1004, name: "Blood group", price: 5000 },
      { id: 1005, name: "Malaria Parasite", price: 4500 },
      { id: 1006, name: "Hepatitis B Panel", price: 17000 },
    ],
  },
  {
    id: "serology",
    name: "SEROLOGY",
    tests: [
      { id: 2001, name: "Widal", price: 4500 },
      { id: 2002, name: "HIV I/II", price: 4000 },
      { id: 2003, name: "Hepatitis B", price: 5500 },
      { id: 2004, name: "Hepatitis C virus", price: 5500 },
      { id: 2005, name: "Gonorrhoea", price: 6500 },
      { id: 2006, name: "Herpes Simplex", price: 13000 },
      { id: 2007, name: "Chlamydia", price: 6500 },
      { id: 2008, name: "Vdrl (Syphilis)", price: 6000 },
      { id: 2009, name: "Pregnancy test", price: 4000 },
      { id: 2010, name: "H. Pylori", price: 5000 },
    ],
  },
  {
    id: "endocrinology",
    name: "ENDOCRINOLOGY",
    tests: [
      { id: 3001, name: "FSH", price: 16000 },
      { id: 3002, name: "LH", price: 16000 },
      { id: 3003, name: "Prolactin", price: 16000 },
      { id: 3004, name: "Progesterone", price: 16000 },
      { id: 3005, name: "Estradiol", price: 16000 },
      { id: 3006, name: "Testosterone", price: 16000 },
      { id: 3007, name: "TSH", price: 10000 },
      { id: 3008, name: "T4", price: 10000 },
      { id: 3009, name: "T3", price: 10000 },
    ],
  },
  {
    id: "chemical_pathology",
    name: "CHEMICAL PATHOLOGY",
    tests: [
      { id: 4001, name: "Fasting blood sugar", price: 3500 },
      { id: 4002, name: "Random blood sugar", price: 3500 },
      { id: 4003, name: "Liver function test (LFT)", price: 15000 },
      { id: 4004, name: "Renal function test (E/u/cr)", price: 15000 },
      { id: 4005, name: "Lipid profile", price: 15000 },
      { id: 4006, name: "Uric acid", price: 10000 },
      { id: 4007, name: "Albumin", price: 8500 },
      { id: 4008, name: "Calcium", price: 14000 },
    ],
  },
  {
    id: "microbiology",
    name: "MICROBIOLOGY",
    tests: [
      { id: 5001, name: "HVS m/c/s", price: 9500 },
      { id: 5002, name: "Urine m/c/s", price: 9500 },
      { id: 5003, name: "Sputum m/c/s", price: 15000 },
      { id: 5004, name: "Urinalysis", price: 4500 },
      { id: 5005, name: "Stool m/c/s", price: 13000 },
      { id: 5006, name: "Semen analysis", price: 14500 },
      { id: 5007, name: "Seminal fluid analysis/mcs", price: 21000 },
    ],
  },
  {
    id: "cervical_cancer",
    name: "CERVICAL CANCER SCREENING",
    tests: [
      { id: 6001, name: "VIA/VILLI", price: 10000 },
      { id: 6002, name: "Pap Smear", price: 30000 },
    ],
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
// Update selectedTests and total price when test IDs change
watch(
  () => screeningForm.value.tests,
  (testIds) => {
    const allTests = screeningCategories.value.flatMap((c) => c.tests);
    selectedTests.value = allTests.filter((test) => testIds.includes(test.id));
    totalTestPrice.value = selectedTests.value.reduce(
      (total, test) => total + test.price,
      0
    );
    screeningForm.value.price = totalTestPrice.value;
  },
  { immediate: true }
);

// Helpers to toggle/select all tests in a category
const isCategorySelected = (category) =>
  category.tests.every((t) => screeningForm.value.tests.includes(t.id));

// True when some but not all tests in the category are selected
const isCategoryPartiallySelected = (category) => {
  const ids = category.tests.map((t) => t.id);
  const selected = (screeningForm.value.tests || []).filter((id) =>
    ids.includes(id)
  );
  return selected.length > 0 && selected.length < ids.length;
};

const toggleCategorySelection = (category) => {
  const ids = category.tests.map((t) => t.id);
  const currentlySelected = screeningForm.value.tests || [];
  if (isCategorySelected(category)) {
    // remove these ids
    screeningForm.value.tests = currentlySelected.filter(
      (id) => !ids.includes(id)
    );
  } else {
    // add ids (avoid duplicates)
    screeningForm.value.tests = Array.from(
      new Set([...currentlySelected, ...ids])
    );
  }
};

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
