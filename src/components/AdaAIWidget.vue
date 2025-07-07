<template>
  <div>
    <!-- Floating Chat Container -->
    <div
      class="fixed bottom-6 right-6 z-52 transition-all duration-300 ease-in-out"
    >
      <!-- Chat Button -->
      <button
        @click="openChat"
        class="bg-pink-700 hover:bg-pink-600 text-white rounded-full p-4 shadow-deep transition-all duration-300 hover:scale-110 group"
        title="Ask AdaAI"
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
        class="absolute bottom-16 right-0 w-96 bg-white rounded-2xl shadow-deep border border-gray-200 h-[500px] flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-pink-700 to-pink-600 text-white p-6 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5"
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
              <h2 class="font-bold text-lg">AdaAI</h2>
              <p class="text-pink-100 text-sm">Your Health Assistant</p>
            </div>
          </div>
          <button
            @click="closeChat"
            class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
          >
            <svg
              class="w-4 h-4 text-pink-900"
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

        <!-- Chat Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
          <!-- Loading State -->
          <div
            v-if="isLoading && messages.length === 0"
            class="flex items-center justify-center py-8"
          >
            <div class="text-center">
              <div
                class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-700 mb-3"
              ></div>
              <p class="text-gray-500 text-sm">Connecting to AdaAI...</p>
            </div>
          </div>

          <!-- Connection Error State -->
          <div
            v-if="
              !isLoading &&
              messages.length === 1 &&
              messages[0].text.includes('trouble connecting')
            "
            class="flex items-center justify-center py-8"
          >
            <div class="text-center">
              <div
                class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <svg
                  class="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p class="text-gray-600 text-sm mb-4">Connection failed</p>
              <button
                @click="retryConnection"
                class="px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div v-for="(message, index) in messages" :key="index" class="flex">
            <div
              :class="[
                'max-w-[80%] rounded-2xl px-4 py-3 shadow-soft',
                message.type === 'user'
                  ? 'ml-auto bg-pink-700 text-white'
                  : 'mr-auto bg-gray-100 text-gray-900',
              ]"
            >
              <p class="text-sm leading-relaxed">{{ message.text }}</p>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isLoading && messages.length > 0" class="flex">
            <div
              class="mr-auto bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 shadow-soft"
            >
              <div class="flex space-x-1">
                <div
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                ></div>
                <div
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 0.1s"
                ></div>
                <div
                  class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style="animation-delay: 0.2s"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-gray-200 p-4 bg-gray-50">
          <div class="flex gap-3">
            <input
              v-model="inputMessage"
              @keydown.enter="sendMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              :disabled="isLoading || !hasActiveSession"
            />
            <button
              @click="sendMessage"
              :disabled="!inputMessage.trim() || isLoading || !hasActiveSession"
              class="px-6 py-3 bg-pink-700 text-white rounded-xl hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { useChatbotStore } from "@/store/chatbotStore";

// Initialize chatbot store
const chatbotStore = useChatbotStore();

// Local state
const inputMessage = ref("");
const chatContainer = ref(null);

// Computed properties
const messages = computed(() => chatbotStore.getMessages);
const isLoading = computed(() => chatbotStore.getIsLoading);
const isOpen = computed(() => chatbotStore.getIsOpen);
const hasActiveSession = computed(() => chatbotStore.hasActiveSession);

// Methods
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const openChat = async () => {
  await chatbotStore.openChat();
  scrollToBottom();
};

const closeChat = () => {
  chatbotStore.closeChat();
};

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value || !hasActiveSession.value)
    return;

  const message = inputMessage.value.trim();
  inputMessage.value = "";

  await chatbotStore.sendMessage(message);
  scrollToBottom();
};

const retryConnection = () => {
  chatbotStore.retryConnection();
  scrollToBottom();
};

// Initialize chatbot on mount
onMounted(() => {
  chatbotStore.initializeChatbot();
});

// Watch for new messages to scroll
import { watch } from "vue";
watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Smooth animations */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Message animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.space-y-4 > * {
  animation: slideIn 0.3s ease-out;
}
</style>
