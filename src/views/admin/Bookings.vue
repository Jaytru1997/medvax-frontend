<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

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
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-12 text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4"
          >
            <svg
              class="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
          <p class="text-gray-500 mb-6">
            The booking management feature is currently under development.
            You'll be able to view and manage all consultation bookings here.
          </p>
          <div
            class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto"
          >
            <h4 class="font-medium text-blue-900 mb-2">Planned Features:</h4>
            <ul class="text-sm text-blue-800 space-y-1 text-left">
              <li>• View all consultation bookings</li>
              <li>• Cancel or reschedule appointments</li>
              <li>• Export booking data</li>
              <li>• Booking analytics and reports</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
