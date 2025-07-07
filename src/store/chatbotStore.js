// Chatbot Store
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const useChatbotStore = defineStore("chatbot", {
  state: () => ({
    messages: [],
    isLoading: false,
    userId: null,
    sessionId: null,
    isOpen: false,
    error: null,
    hasFailedToStart: false, // Track if we've failed to start conversation
  }),

  getters: {
    getMessages: (state) => state.messages,
    getIsLoading: (state) => state.isLoading,
    getIsOpen: (state) => state.isOpen,
    getUserId: (state) => state.userId,
    getSessionId: (state) => state.sessionId,
    getError: (state) => state.error,
    hasActiveSession: (state) => !!state.sessionId,
  },

  actions: {
    // Generate or retrieve user ID
    generateUserId() {
      let id = localStorage.getItem("chatbot_user_id");
      if (!id) {
        id =
          "uuid_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("chatbot_user_id", id);
      }
      this.userId = id;
      return id;
    },

    // Initialize chatbot
    initializeChatbot() {
      if (!this.userId) {
        this.generateUserId();
      }
    },

    // Start conversation
    async startConversation() {
      // Prevent multiple attempts if we've already failed
      if (this.hasFailedToStart && this.messages.length > 0) {
        return false;
      }

      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(
          `${API_URL}/api/chatbot/start-conversation`,
          {
            userId: this.userId,
          }
        );

        this.sessionId = response.data.sessionId;
        this.hasFailedToStart = false; // Reset failure flag on success

        // Only add welcome message if we don't have any messages yet
        if (this.messages.length === 0) {
          this.addMessage({
            type: "bot",
            text: "Hello! I'm AdaAI, your virtual health assistant. How can I help you today?",
          });
        }

        return true;
      } catch (error) {
        console.error("Failed to start conversation:", error);
        this.error = "Failed to start conversation";
        this.hasFailedToStart = true;

        // Only add error message if we don't have any messages yet
        if (this.messages.length === 0) {
          this.addMessage({
            type: "bot",
            text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          });
        }
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    // Send message
    async sendMessage(messageText) {
      if (!messageText.trim() || this.isLoading) return false;

      // If no session, try to start one first
      if (!this.sessionId) {
        const started = await this.startConversation();
        if (!started) {
          return false;
        }
      }

      // Add user message
      this.addMessage({
        type: "user",
        text: messageText.trim(),
      });

      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(`${API_URL}/api/chatbot/chat`, {
          message: messageText.trim(),
          userId: this.userId,
          sessionId: this.sessionId,
          contextData: {
            userType: "patient",
            platform: "web",
          },
        });

        this.addMessage({
          type: "bot",
          text:
            response.data.text ||
            "I'm sorry, I didn't understand that. Could you please rephrase?",
        });

        return true;
      } catch (error) {
        console.error("Chat error:", error);

        let errorMessage =
          "Sorry, I'm having trouble right now. Please try again later.";

        if (error.response) {
          const { status, data } = error.response;

          if (status === 429) {
            errorMessage =
              "I'm receiving too many requests right now. Please wait a moment and try again.";
          } else if (status === 400) {
            errorMessage = data.error || "Invalid request. Please try again.";
          } else if (status === 404) {
            // Session might have expired, try to restart
            this.sessionId = null;
            const restarted = await this.startConversation();
            if (restarted) {
              // Retry the message after restarting
              return await this.sendMessage(messageText);
            }
            return false;
          }
        }

        this.addMessage({
          type: "bot",
          text: errorMessage,
        });

        return false;
      } finally {
        this.isLoading = false;
      }
    },

    // Add message to chat
    addMessage(message) {
      this.messages.push(message);
    },

    // Open chat
    async openChat() {
      this.isOpen = true;

      if (!this.userId) {
        this.generateUserId();
      }

      // Only try to start conversation if we don't have a session and haven't failed before
      if (!this.sessionId && !this.hasFailedToStart) {
        await this.startConversation();
      }
    },

    // Close chat
    closeChat() {
      this.isOpen = false;
    },

    // Clear messages
    clearMessages() {
      this.messages = [];
    },

    // Reset session
    resetSession() {
      this.sessionId = null;
      this.messages = [];
      this.error = null;
      this.hasFailedToStart = false;
    },

    // Retry connection
    async retryConnection() {
      this.hasFailedToStart = false;
      this.messages = [];
      this.sessionId = null;
      return await this.startConversation();
    },
  },
});

// Hot Module Replacement (HMR) for the chatbot store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatbotStore, import.meta.hot));
}
