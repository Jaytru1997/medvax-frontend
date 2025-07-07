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
    return;
  }

  // Redirect to manager blog page since admins can also manage blogs
  router.push("/manager/blog");
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"
      ></div>
      <p class="text-gray-500">Redirecting to blog management...</p>
    </div>
  </div>
</template>
