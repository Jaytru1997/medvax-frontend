<script setup>
// import PageHeader from "@/components/PageHeader.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useBlogStore } from "@/store/blogStore";

// Initialize the blog store and router
const blogStore = useBlogStore();
const router = useRouter();

// Default category selection
const selectedCategory = ref("All");

// Computed properties to get categories and blogs from the store
const blogCategories = computed(() => {
  const categories = blogStore.getBlogCategories;
  const allBlogs = blogStore.getBlogs;

  // Create the "All" category with all blogs
  const allCategory = {
    name: "All",
    blog: allBlogs,
  };

  // Create category objects with their respective blogs
  const categoryObjects = categories.map((category) => ({
    name: category,
    blog: blogStore.getBlogsByCategory(category),
  }));

  // Return "All" category first, then other categories
  return [allCategory, ...categoryObjects];
});

// Computed properties for loading and error states
const isLoading = computed(() => blogStore.getIsLoading);
const error = computed(() => blogStore.getError);

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const readMore = (blog) => {
  router.push(`/blog/${blog._id || blog.id}`);
};

// Fetch blogs when component mounts
onMounted(async () => {
  try {
    await blogStore.fetchBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
});
</script>
<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Page Header -->
    <div class="flex flex-col items-center justify-center gap-8 my-12 px-4">
      <div
        class="flex flex-col items-center justify-center gap-8 bg-light-blue-100 my-12 pt-12 rounded-lg blog-header w-full xl:max-w-7xl"
      >
        <img
          src="../../public/asset/icons/logo-icon-black.svg"
          alt=""
          class="bg-gradient-to-b from-light-blue-500 to-light-blue-300 p-2 rounded-lg w-16 h-16 border-3 border-white"
        />
        <h2 class="my-4 text-2xl sm:text-4xl font-semibold font-urbanist">
          Our Blog
        </h2>
        <p
          class="text-xs sm:text-base text-center font-normal font-urbanist px-4 sm:px-0 w-5/6"
        >
          Stay updated with the latest in healthcare technology, pharmaceutical
          care, reproductive health, and MedVax Health's impact in Africa.
        </p>
        <div
          class="bg-dark-blue-900 flex flex-wrap items-center justify-center py-4 gap-4 *:text-white w-full rounded-b-lg text--xs"
        >
          <!-- Dynamically set teams and implement border-1 border-bright-blue-100 for selected team -->
          <p
            v-for="category in blogCategories"
            :key="category.name"
            class="rounded py-2 px-3 cursor-pointer"
            :class="{
              'border-1 border-bright-blue-100 bg-dark-blue-700':
                category.name === selectedCategory,
            }"
            @click="selectCategory(category.name)"
          >
            {{ category.name }}
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-light-blue-900 mb-3"
          ></div>
          <p class="text-gray-500">Loading blog posts...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center py-12">
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
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button
            @click="blogStore.fetchBlogs()"
            class="px-4 py-2 bg-light-blue-600 text-white rounded-lg hover:bg-light-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Blog Posts -->
      <div
        v-else-if="
          blogCategories.find((cat) => cat.name === selectedCategory)?.blog
            ?.length > 0
        "
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0 items-center justify-center w-full xl:max-w-7xl xl:mx-auto *:even:rounded-tr"
      >
        <div
          v-for="blog in blogCategories.find(
            (category) => category.name === selectedCategory
          )?.blog || []"
          :key="blog._id || blog.id"
          class="flex flex-col items-start justify-center bg-light-blue-300 p-4 sm:p-8 gap-8"
          :title="blog.title"
        >
          <p class="flex flex-col gap-0 text-xs lg:text-sm px-4 sm:px-0">
            {{ blog.category || selectedCategory }}
            <span class="blog-item-line"></span>
          </p>
          <img
            :src="blog.banner"
            :alt="blog.title"
            class="w-3/4 h-[200px] object-cover rounded flex self-end"
            @error="$event.target.src = '/asset/images/team/chioma.png'"
          />
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between w-full"
          >
            <div class="flex flex-col gap-2 sm:w-3/4">
              <h3 class="text-lg font-semibold line-clamp-1">
                {{ blog.title }}
              </h3>
              <p class="text-sm font-normal text-dark line-clamp-3">
                {{ blog.excerpt }}
              </p>
            </div>
            <button
              @click="readMore(blog)"
              class="bg-light-blue-500 text-dark py-2 px-4 rounded text-wrap hover:bg-light-blue-600 transition-colors"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex items-center justify-center py-12">
        <div class="text-center">
          <div
            class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <svg
              class="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <p class="text-gray-600 mb-4">
            No blog posts found in this category.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-header {
  background-image: url("../../public/asset/icons/header-abstract.svg");
  background-repeat: no-repeat;
  background-position: top;
  background-size: 30rem;
}

.blog-item-line {
  width: 100%;
  height: 2px;
  background-color: var(--color-light-blue-700);
  margin-top: 1px;
}
</style>
