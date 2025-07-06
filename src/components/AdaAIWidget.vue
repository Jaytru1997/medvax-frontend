<template>
  <div>
    <!-- Floating Button -->
    <button
      @click="isOpen = true"
      class="fixed bottom-6 right-6 z-50 bg-pink-700 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg"
      title="Ask AdaAI"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 8h10M7 12h6m-6 4h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </button>

    <!-- Fullscreen Chat Modal -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-52 bg-white text-darkBlue-900 flex flex-col"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-light"
        >
          <h2 class="text-xl font-bold">
            AdaAI – Your Virtual Health Assistant
          </h2>
          <button
            @click="isOpen = false"
            class="text-xl text-dark hover:text-pink-700"
          >
            ✕
          </button>
        </div>

        <!-- Chat Body -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
          <div v-for="(msg, index) in messages" :key="index">
            <div v-if="msg.type === 'user'" class="text-right">
              <p class="inline-block bg-pink-100 text-dark p-2 rounded-lg">
                {{ msg.text }}
              </p>
            </div>
            <div v-else class="text-left">
              <p class="inline-block bg-lightBlue-100 text-dark p-2 rounded-lg">
                {{ msg.text }}
              </p>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="border-t border-light p-4 flex gap-2">
          <input
            v-model="input"
            @keydown.enter="sendMessage"
            type="text"
            placeholder="Ask AdaAI something..."
            class="flex-1 border border-light rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-blue-900"
          />
          <button
            @click="sendMessage"
            class="bg-light-blue-900 text-white px-4 py-2 rounded hover:bg-light-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import axios from "axios";

const isOpen = ref(false);
const input = ref("");
const messages = ref([]);
const chatContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const sendMessage = async () => {
  if (!input.value.trim()) return;
  const userMsg = input.value.trim();
  messages.value.push({ type: "user", text: userMsg });
  input.value = "";

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/chatbot/query`,
      {
        message: userMsg,
      }
    );
    messages.value.push({
      type: "bot",
      text: res.data.reply || "No response.",
    });
  } catch (err) {
    messages.value.push({ type: "bot", text: "Oops! Something went wrong." });
  }

  scrollToBottom();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
