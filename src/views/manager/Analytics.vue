<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { useBlogStore } from "@/store/blogStore";

const router = useRouter();
const authStore = useAuthStore();
const blogStore = useBlogStore();

// Analytics data
const analytics = ref({
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
  totalViews: 0,
  averageViews: 0,
  topPosts: [],
  monthlyStats: [],
});

const isLoading = ref(false);

const fetchAnalytics = async () => {
  try {
    isLoading.value = true;

    // Fetch blogs first
    await blogStore.fetchBlogs();

    // Calculate analytics from blog data
    const blogs = blogStore.getBlogs;
    analytics.value.totalPosts = blogs.length;
    analytics.value.publishedPosts = blogs.filter(
      (blog) => blog.status === "published"
    ).length;
    analytics.value.draftPosts = blogs.filter(
      (blog) => blog.status === "draft"
    ).length;

    // Calculate total views (assuming each blog has a views property)
    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
    analytics.value.totalViews = totalViews;
    analytics.value.averageViews =
      blogs.length > 0 ? Math.round(totalViews / blogs.length) : 0;

    // Get top posts by views
    analytics.value.topPosts = blogs
      .filter((blog) => blog.views > 0)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);

    // Mock monthly stats (in a real app, this would come from the API)
    analytics.value.monthlyStats = [
      { month: "Jan", posts: 3, views: 1200 },
      { month: "Feb", posts: 5, views: 1800 },
      { month: "Mar", posts: 4, views: 1500 },
      { month: "Apr", posts: 6, views: 2200 },
      { month: "May", posts: 7, views: 2800 },
      { month: "Jun", posts: 8, views: 3200 },
    ];
  } catch (error) {
    console.error("Error fetching analytics:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // Check if user is manager
  if (!authStore.isManager) {
    router.push("/login");
    return;
  }

  await fetchAnalytics();
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
              @click="router.push('/manager/dashboard')"
              class="mr-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <h1 class="text-2xl font-bold text-gray-900">Blog Analytics</h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div v-if="isLoading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="text-gray-500 mt-4">Loading analytics...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                      {{ analytics.totalPosts }}
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
                      {{ analytics.publishedPosts }}
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
                      {{ analytics.draftPosts }}
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
                    <span class="text-white text-lg">👁️</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Avg Views
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ analytics.averageViews }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Performing Posts -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              Top Performing Posts
            </h3>
          </div>
          <div class="p-6">
            <div
              v-if="analytics.topPosts.length === 0"
              class="text-center py-8"
            >
              <p class="text-gray-500">No posts with views data available.</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="(post, index) in analytics.topPosts"
                :key="post.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center">
                  <span class="text-lg font-bold text-gray-400 mr-4"
                    >#{{ index + 1 }}</span
                  >
                  <div>
                    <h4 class="font-medium text-gray-900">{{ post.title }}</h4>
                    <p class="text-sm text-gray-500">{{ post.category }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-gray-900">
                    {{ post.views || 0 }}
                  </p>
                  <p class="text-sm text-gray-500">views</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Statistics -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              Monthly Statistics
            </h3>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Month
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Posts Published
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Views
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg Views per Post
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="stat in analytics.monthlyStats" :key="stat.month">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ stat.month }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ stat.posts }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ stat.views.toLocaleString() }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{
                        stat.posts > 0 ? Math.round(stat.views / stat.posts) : 0
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Performance Insights -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              Performance Insights
            </h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 class="font-medium text-blue-900 mb-2">📈 Growth Trend</h4>
                <p class="text-sm text-blue-800">
                  Your blog is showing positive growth with
                  {{ analytics.publishedPosts }} published posts and an average
                  of {{ analytics.averageViews }} views per post.
                </p>
              </div>

              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 class="font-medium text-green-900 mb-2">🎯 Engagement</h4>
                <p class="text-sm text-green-800">
                  {{ analytics.draftPosts }} posts are currently in draft.
                  Consider publishing more content to increase engagement.
                </p>
              </div>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 class="font-medium text-yellow-900 mb-2">
                  📊 Content Strategy
                </h4>
                <p class="text-sm text-yellow-800">
                  Focus on creating high-quality content that resonates with
                  your audience. Monitor top-performing posts for insights.
                </p>
              </div>

              <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 class="font-medium text-purple-900 mb-2">
                  🚀 Recommendations
                </h4>
                <p class="text-sm text-purple-800">
                  Consider publishing more content in popular categories and
                  promoting posts through social media channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
