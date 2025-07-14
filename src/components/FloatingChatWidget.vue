<template>
  <div>
    <!-- Floating Chat Container -->
    <div
      class="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out"
    >
      <!-- Chat Button -->
      <button
        @click="toggleChat"
        class="bg-pink-700 hover:bg-pink-600 text-white rounded-full p-4 shadow-deep transition-all duration-300 hover:scale-110 group"
        title="Chat with AdaAI"
      >
        <!-- Chat Icon -->
        <svg
          class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      <!-- Chat Panel -->
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 w-96 h-[600px] bg-white rounded-2xl shadow-deep border border-gray-200 flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-pink-700 to-pink-600 text-white p-4 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h2 class="font-bold text-base">AdaAI Chat</h2>
              <p class="text-pink-100 text-xs">Your Health Assistant</p>
            </div>
          </div>
          <button
            @click="closeChat"
            class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg
              class="w-3 h-3 text-pink-900"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Iframe Container -->
        <div class="flex-1 relative">
          <!-- Loading State -->
          <div
            v-if="isLoading"
            class="absolute inset-0 bg-gray-50 flex items-center justify-center z-10"
          >
            <div class="text-center">
              <div
                class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-700 mb-3"
              ></div>
              <p class="text-gray-500 text-sm">Loading AdaAI...</p>
            </div>
          </div>

          <!-- Iframe -->
          <iframe
            v-show="!isLoading"
            :src="chatUrl"
            class="w-full h-full border-0"
            @load="onIframeLoad"
            title="AdaAI Chat Interface"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// State
const isOpen = ref(false);
const isLoading = ref(false);
const chatUrl = "https://adaai.virtualstylist.buzz/";

// Methods
const toggleChat = () => {
  if (!isOpen.value) {
    isLoading.value = true;
  }
  isOpen.value = !isOpen.value;
};

const closeChat = () => {
  isOpen.value = false;
};

const onIframeLoad = () => {
  isLoading.value = false;
};

// Close chat when clicking outside (optional)
const handleClickOutside = (event) => {
  const chatContainer = event.target.closest(".fixed");
  if (isOpen.value && !chatContainer) {
    closeChat();
  }
};

// Add click outside listener
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Custom scrollbar for iframe container */
.overflow-hidden {
  overflow: hidden;
}

/* Smooth animations */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .fixed {
    bottom: 1rem;
    right: 1rem;
  }

  .absolute {
    width: calc(100vw - 2rem);
    max-width: 24rem;
    right: 0;
  }
}

@media (max-width: 480px) {
  .absolute {
    width: calc(100vw - 1rem);
    height: 70vh;
    bottom: 5rem;
  }
}
</style>
