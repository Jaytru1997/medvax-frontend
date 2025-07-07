<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlogStore } from "@/store/blogStore";

// Initialize router and store
const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();

// Reactive state
const isLoading = ref(true);
const blog = ref(null);
const error = ref(null);

// Computed properties
const blogId = computed(() => route.params.id);

// Methods
const goBack = () => {
  router.push("/blog");
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Fetch blog data when component mounts
onMounted(async () => {
  try {
    isLoading.value = true;
    error.value = null;

    // Try to get blog from store first
    let foundBlog = blogStore.getBlogById(blogId.value);

    // If not in store, fetch from API
    if (!foundBlog) {
      foundBlog = await blogStore.fetchBlogById(blogId.value);
    }

    if (foundBlog) {
      blog.value = foundBlog;
    } else {
      // Blog not found, redirect to blog list
      router.push("/blog");
    }
  } catch (err) {
    console.error("Error fetching blog:", err);
    error.value = err.response?.data?.message || "Failed to load blog post";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-light-blue-900"
        ></div>
        <p class="text-gray-500 mt-4">Loading blog post...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
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
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Error Loading Blog Post
        </h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="goBack"
          class="bg-light-blue-600 text-white px-6 py-2 rounded-lg hover:bg-light-blue-700 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    </div>

    <!-- Blog Content -->
    <div v-else-if="blog" class="max-w-4xl mx-auto px-4 py-8">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center gap-2 text-light-blue-600 hover:text-light-blue-800 mb-6 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Blog
      </button>

      <!-- Blog Header -->
      <div class="mb-8">
        <!-- Category Badge -->
        <div class="mb-4">
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-light-blue-100 text-light-blue-800"
          >
            {{ blog.category }}
          </span>
        </div>

        <!-- Title -->
        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
        >
          {{ blog.title }}
        </h1>

        <!-- Meta Information -->
        <div class="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span>{{
            formatDate(blog.createdAt || blog.date || new Date())
          }}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="mb-8">
        <img
          :src="blog.banner"
          :alt="blog.title"
          class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          @error="$event.target.src = '/asset/images/team/chioma.png'"
        />
      </div>

      <!-- Blog Content -->
      <div class="prose prose-lg max-w-none">
        <!-- Excerpt -->
        <div
          v-if="blog.excerpt"
          class="mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-light-blue-500"
        >
          <p class="text-lg text-gray-700 italic">
            {{ blog.excerpt }}
          </p>
        </div>

        <!-- Rich Text Content -->
        <div class="blog-content">
          <!-- This is where rich text content would be rendered -->
          <!-- For now, we'll display the content as paragraphs -->
          <div v-if="blog.content" class="space-y-6">
            <p class="text-lg leading-relaxed text-gray-800">
              {{ blog.content }}
            </p>

            <!-- Additional content sections -->
            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Understanding the Impact
            </h2>
            <p class="text-lg leading-relaxed text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Key Takeaways
            </h3>
            <ul class="list-disc list-inside space-y-2 text-lg text-gray-800">
              <li>Innovation in healthcare technology</li>
              <li>Improved access to medications</li>
              <li>Better patient outcomes</li>
              <li>Enhanced community health</li>
            </ul>

            <blockquote
              class="border-l-4 border-light-blue-500 pl-6 py-4 bg-light-blue-50 rounded-r-lg"
            >
              <p class="text-lg italic text-gray-700">
                "Healthcare is a fundamental right, not a privilege. At MedVax
                Health, we're committed to making quality healthcare accessible
                to everyone."
              </p>
            </blockquote>

            <p class="text-lg leading-relaxed text-gray-800">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <!-- Related Articles -->
      <div
        v-if="blogStore.getBlogsByCategory(blog.category).length > 1"
        class="mt-12 pt-8 border-t border-gray-200"
      >
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="relatedBlog in blogStore
              .getBlogsByCategory(blog.category)
              .filter((b) => b._id !== blog._id && b.id !== blog.id)
              .slice(0, 2)"
            :key="relatedBlog._id || relatedBlog.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100"
          >
            <img
              :src="relatedBlog.banner"
              :alt="relatedBlog.title"
              class="w-full h-32 object-cover rounded-lg mb-3"
              @error="$event.target.src = '/asset/images/team/chioma.png'"
            />
            <h4 class="font-semibold text-gray-900 mb-2 line-clamp-2">
              {{ relatedBlog.title }}
            </h4>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ relatedBlog.excerpt }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Blog Post Not Found
        </h2>
        <p class="text-gray-600 mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <button
          @click="goBack"
          class="bg-light-blue-600 text-white px-6 py-2 rounded-lg hover:bg-light-blue-700 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-content {
  line-height: 1.8;
}

.blog-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.blog-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
}

.blog-content p {
  margin-bottom: 1rem;
}

.blog-content ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.blog-content li {
  margin-bottom: 0.5rem;
}

.blog-content blockquote {
  margin: 1.5rem 0;
  font-style: italic;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
