<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();

const API_URL = import.meta.env.VITE_API_URL;

// Form data
const trainingForm = ref({
  intentName: "",
  trainingPhrases: "",
  responseText: "",
});

const isLoading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Sample training data
const sampleIntents = [
  {
    intentName: "greeting",
    trainingPhrases: "Hello, Hi, Good morning, Good afternoon, Good evening",
    responseText:
      "Hello! Welcome to MedVax Health. How can I assist you today?",
  },
  {
    intentName: "product_inquiry",
    trainingPhrases:
      "What products do you have, Do you sell medications, What medications are available",
    responseText:
      "We offer a wide range of medications and health products. You can browse our e-pharmacy to see our complete catalog.",
  },
  {
    intentName: "booking_consultation",
    trainingPhrases:
      "I want to book a consultation, Schedule appointment, Book consultation",
    responseText:
      "I can help you book a consultation. Please visit our website and use the booking form, or contact us directly.",
  },
];

const handleSubmit = async () => {
  if (
    !trainingForm.value.intentName ||
    !trainingForm.value.trainingPhrases ||
    !trainingForm.value.responseText
  ) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const response = await axios.post(
      `${API_URL}/api/admin/train-chatbot`,
      {
        intentName: trainingForm.value.intentName,
        trainingPhrases: trainingForm.value.trainingPhrases,
        responseText: trainingForm.value.responseText,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.getToken}`,
        },
      }
    );

    successMessage.value = "Chatbot trained successfully!";
    trainingForm.value = {
      intentName: "",
      trainingPhrases: "",
      responseText: "",
    };
  } catch (error) {
    console.error("Training error:", error);
    errorMessage.value =
      error.response?.data?.message ||
      "Failed to train chatbot. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const loadSample = (sample) => {
  trainingForm.value = { ...sample };
};

const clearForm = () => {
  trainingForm.value = {
    intentName: "",
    trainingPhrases: "",
    responseText: "",
  };
  successMessage.value = "";
  errorMessage.value = "";
};

onMounted(() => {
  // Check if user is admin
  if (!authStore.isAdmin) {
    router.push("/login");
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <button
              @click="router.push('/admin/dashboard')"
              class="mr-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <h1 class="text-2xl font-bold text-gray-900">Chatbot Training</h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Train AI Chatbot</h3>
          <p class="text-sm text-gray-500 mt-1">
            Add new intents and responses to improve the chatbot's capabilities.
          </p>
        </div>

        <div class="px-6 py-6">
          <!-- Success/Error Messages -->
          <div
            v-if="successMessage"
            class="mb-4 bg-green-50 border border-green-200 rounded-md p-4"
          >
            <p class="text-green-700 text-sm">{{ successMessage }}</p>
          </div>

          <div
            v-if="errorMessage"
            class="mb-4 bg-red-50 border border-red-200 rounded-md p-4"
          >
            <p class="text-red-600 text-sm">{{ errorMessage }}</p>
          </div>

          <!-- Training Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Intent Name *
              </label>
              <input
                v-model="trainingForm.intentName"
                type="text"
                required
                placeholder="e.g., greeting, product_inquiry, booking_consultation"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p class="text-xs text-gray-500 mt-1">
                Use lowercase with underscores (e.g., product_inquiry)
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Training Phrases *
              </label>
              <textarea
                v-model="trainingForm.trainingPhrases"
                rows="4"
                required
                placeholder="Enter multiple phrases separated by commas. These are examples of how users might ask for this intent."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                Separate multiple phrases with commas (e.g., "Hello, Hi, Good
                morning")
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Response Text *
              </label>
              <textarea
                v-model="trainingForm.responseText"
                rows="4"
                required
                placeholder="Enter the response the chatbot should give when this intent is detected."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                This is the response the chatbot will give when it detects this
                intent.
              </p>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="clearForm"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear Form
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                <span v-if="isLoading">Training...</span>
                <span v-else>Train Chatbot</span>
              </button>
            </div>
          </form>

          <!-- Sample Intents -->
          <div class="mt-8">
            <h4 class="text-lg font-medium text-gray-900 mb-4">
              Sample Intents
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                v-for="sample in sampleIntents"
                :key="sample.intentName"
                class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer"
                @click="loadSample(sample)"
              >
                <h5 class="font-medium text-gray-900 mb-2">
                  {{ sample.intentName }}
                </h5>
                <p class="text-sm text-gray-600 mb-2">
                  <strong>Phrases:</strong> {{ sample.trainingPhrases }}
                </p>
                <p class="text-sm text-gray-600">
                  <strong>Response:</strong> {{ sample.responseText }}
                </p>
                <button
                  @click="loadSample(sample)"
                  class="mt-2 text-blue-600 text-sm hover:text-blue-800"
                >
                  Load Sample
                </button>
              </div>
            </div>
          </div>

          <!-- Training Tips -->
          <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="text-lg font-medium text-blue-900 mb-2">
              Training Tips
            </h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Use clear, specific intent names with underscores</li>
              <li>
                • Include various ways users might phrase the same request
              </li>
              <li>• Keep responses concise and helpful</li>
              <li>
                • Test the chatbot after training to ensure it works correctly
              </li>
              <li>
                • Consider common misspellings and variations in training
                phrases
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
