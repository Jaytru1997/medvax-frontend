<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { useTeamStore } from "@/store/teamStore";
import { useProductStore } from "@/store/productStore";
import { useBlogStore } from "@/store/blogStore";
import { useBookingStore } from "@/store/bookingStore";

const router = useRouter();
const authStore = useAuthStore();
const teamStore = useTeamStore();
const productStore = useProductStore();
const blogStore = useBlogStore();
const bookingStore = useBookingStore();

// Dashboard stats
const stats = ref({
  totalProducts: 0,
  totalBookings: 0,
  totalTeamMembers: 0,
  totalBlogPosts: 0,
});

// Navigation items
const navItems = [
  {
    title: "Products",
    description: "Manage medications and health products",
    icon: "💊",
    route: "/admin/products",
    color: "bg-blue-500",
  },
  {
    title: "Bookings",
    description: "View and manage consultation bookings",
    icon: "📅",
    route: "/admin/bookings",
    color: "bg-green-500",
  },
  {
    title: "Team Members",
    description: "Manage team members and roles",
    icon: "👥",
    route: "/admin/team",
    color: "bg-purple-500",
  },
  {
    title: "Chatbot Training",
    description: "Train and manage the AI chatbot",
    icon: "🤖",
    route: "/admin/chatbot",
    color: "bg-orange-500",
  },
  {
    title: "Blog Posts",
    description: "Manage blog content and articles",
    icon: "📝",
    route: "/admin/blog",
    color: "bg-pink-500",
  },
];

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};

const loadDashboardData = async () => {
  try {
    // Fetch all data in parallel
    await Promise.all([
      teamStore.fetchTeamMembers(),
      productStore.fetchProducts(),
      blogStore.fetchBlogs(),
      bookingStore.fetchBookings(),
    ]);

    // Update stats
    stats.value = {
      totalProducts: productStore.getProducts.length,
      totalBookings: bookingStore.getBookings.length,
      totalTeamMembers: teamStore.getTeamMembers.length,
      totalBlogPosts: blogStore.getBlogs.length,
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
};

onMounted(async () => {
  // Check if user is admin
  if (!authStore.isAdmin) {
    router.push("/login");
    return;
  }

  // Load dashboard data
  await loadDashboardData();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center justify-between w-full">
            <span class="text-sm text-gray-700">
              Welcome, {{ authStore.getUser?.name || "Admin" }}
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center"
                >
                  <span class="text-white text-lg">💊</span>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Products
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.totalProducts }}
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
                  <span class="text-white text-lg">📅</span>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Bookings
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.totalBookings }}
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
                  class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center"
                >
                  <span class="text-white text-lg">👥</span>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Team Members
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.totalTeamMembers }}
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
                  class="w-8 h-8 bg-pink-500 rounded-md flex items-center justify-center"
                >
                  <span class="text-white text-lg">📝</span>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Blog Posts
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats.totalBlogPosts }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
