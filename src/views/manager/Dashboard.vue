<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

// Dashboard stats
const stats = ref({
  totalBlogPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
});

// Navigation items
const navItems = [
  {
    title: "Blog Posts",
    description: "Create, edit, and manage blog content",
    icon: "📝",
    route: "/manager/blog",
    color: "bg-blue-500",
  },
  {
    title: "Analytics",
    description: "View blog performance and analytics",
    icon: "📊",
    route: "/manager/analytics",
    color: "bg-green-500",
  },
];

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};

onMounted(() => {
  // Check if user is manager
  if (!authStore.isManager) {
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
            <img
              class="h-8 w-auto"
              src="../../../public/asset/logo/logo.svg"
              alt="MedVax Health"
            />
            <h1 class="ml-4 text-2xl font-bold text-gray-900">
              Manager Dashboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">
              Welcome, {{ authStore.getUser?.name || "Manager" }}
            </span>
            <button
              @click="handleLogout"
              class="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center"
                >
                  <span class="text-white text-lg">📝</span>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Posts
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.totalBlogPosts }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center"
                >
                  <span class="text-white text-lg">✅</span>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Published
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.publishedPosts }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center"
                >
                  <span class="text-white text-lg">📄</span>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Drafts
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.draftPosts }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="item in navItems"
          :key="item.title"
          @click="router.push(item.route)"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  :class="`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`"
                >
                  <span class="text-white text-2xl">{{ item.icon }}</span>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ item.title }}
                </h3>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
