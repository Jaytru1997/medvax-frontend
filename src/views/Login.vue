<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    await authStore.login(formData.value);

    // Redirect based on user role
    if (authStore.isAdmin) {
      router.push("/admin/dashboard");
    } else if (authStore.isManager) {
      router.push("/manager/dashboard");
    } else {
      router.push("/");
    }
  } catch (error) {
    // Error is handled in the store
  }
};

onMounted(() => {
  // Clear any previous errors
  authStore.clearError();
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-light-blue-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="../../public/asset/logo/logo.svg"
          alt="MedVax Health"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link
            to="/register"
            class="font-medium no-underline text-light-blue-600 hover:text-light-blue-500"
          >
            create a new account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="formData.email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="formData.password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div
          v-if="authStore.getError"
          class="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <p class="text-red-600 text-sm">{{ authStore.getError }}</p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.getIsLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-light-blue-500 hover:bg-light-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="authStore.getIsLoading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ authStore.getIsLoading ? "Signing in..." : "Sign in" }}
          </button>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link
              to="/"
              class="font-medium text-light-blue-600 hover:text-light-blue-500"
            >
              Back to Home
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
