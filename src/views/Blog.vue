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

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const readMore = (blog) => {
  router.push(`/blog/${blog.id}`);
};

// Fetch blogs when component mounts
onMounted(async () => {
  await blogStore.fetchBlogs();
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

      <!-- Our Team Of Experts  -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0 items-center justify-center w-full xl:max-w-7xl xl:mx-auto *:even:rounded-tr"
      >
        <div
          v-for="blog in blogCategories.find(
            (category) => category.name === selectedCategory
          )?.blog || []"
          :key="blog.title"
          class="flex flex-col items-start justify-center bg-light-blue-300 p-4 sm:p-8 gap-8"
          :title="blog.title"
        >
          <p class="flex flex-col gap-0 text-xs lg:text-sm px-4 sm:px-0">
            {{ blog.category || selectedCategory }}
            <span class="blog-item-line"></span>
          </p>
          <img
            :src="blog.banner"
            alt="Blog Image"
            class="w-3/4 h-[200px] object-cover rounded flex self-end"
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
