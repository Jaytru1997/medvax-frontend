<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { useBlogStore } from "@/store/blogStore";

const router = useRouter();
const authStore = useAuthStore();
const blogStore = useBlogStore();

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedBlog = ref(null);

// Form data
const blogForm = ref({
  title: "",
  excerpt: "",
  content: "",
  category: "",
  banner: null,
  author: "",
  status: "draft",
});

// Rich text editor state
const isContentFocused = ref(false);

const categories = [
  "Healthcare Technology",
  "Pharmaceutical Care",
  "Reproductive Health",
  "Women's Health",
  "Digital Health",
  "Innovation",
  "Community Health",
  "Other",
];

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

const resetForm = () => {
  blogForm.value = {
    title: "",
    excerpt: "",
    content: "",
    category: "",
    banner: null,
    author: "",
    status: "draft",
  };
};

const openAddModal = () => {
  resetForm();
  blogForm.value.author = authStore.getUser?.name || "";
  showAddModal.value = true;
};

const openEditModal = (blog) => {
  selectedBlog.value = blog;
  blogForm.value = {
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    category: blog.category,
    banner: null,
    author: blog.author,
    status: blog.status || "draft",
  };
  showEditModal.value = true;
  // Set content in rich text editor after modal is shown
  setTimeout(() => {
    setContent(blog.content || "");
  }, 100);
};

const openDeleteModal = (blog) => {
  selectedBlog.value = blog;
  showDeleteModal.value = true;
};

const closeModals = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showDeleteModal.value = false;
  selectedBlog.value = null;
  resetForm();
  // Clear rich text editor
  setContent("");
};

const handleAddBlog = async () => {
  try {
    // Get content from rich text editor
    blogForm.value.content = getContent();

    // Create FormData for file upload
    const formData = new FormData();
    for (const key in blogForm.value) {
      if (key === "banner" && blogForm.value.banner) {
        formData.append("banner", blogForm.value.banner);
      } else if (key !== "banner") {
        formData.append(key, blogForm.value[key]);
      }
    }

    await blogStore.createBlog(formData, authStore.getToken);
    closeModals();
  } catch (error) {
    console.error("Error adding blog:", error);
  }
};

const handleEditBlog = async () => {
  try {
    // Get content from rich text editor
    blogForm.value.content = getContent();

    // Create FormData for file upload
    const formData = new FormData();
    for (const key in blogForm.value) {
      if (key === "banner" && blogForm.value.banner) {
        formData.append("banner", blogForm.value.banner);
      } else if (key !== "banner") {
        formData.append(key, blogForm.value[key]);
      }
    }

    await blogStore.updateBlog(
      selectedBlog.value._id || selectedBlog.value.id,
      formData,
      authStore.getToken
    );
    closeModals();
  } catch (error) {
    console.error("Error updating blog:", error);
  }
};

const handleDeleteBlog = async () => {
  try {
    await blogStore.deleteBlog(
      selectedBlog.value._id || selectedBlog.value.id,
      authStore.getToken
    );
    closeModals();
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};

const getStatusBadgeClass = (status) => {
  return status === "published"
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
};

// Rich text editor functions
const formatText = (command, value = null) => {
  document.execCommand(command, false, value);
};

const getContent = () => {
  const contentDiv = document.getElementById("content-editor");
  return contentDiv ? contentDiv.innerHTML : "";
};

const setContent = (content) => {
  const contentDiv = document.getElementById("content-editor");
  if (contentDiv) {
    contentDiv.innerHTML = content;
  }
};

const handleBannerUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    blogForm.value.banner = file;
  }
};

onMounted(async () => {
  // Check if user is manager
  if (!authStore.isAdmin) {
    router.push("/login");
    return;
  }

  // Fetch blogs
  try {
    await blogStore.fetchBlogs();
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
          <button
            @click="openAddModal"
            class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Add Blog Post
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Blog Posts Grid -->
      <div v-if="blogStore.getIsLoading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="text-gray-500 mt-4">Loading blog posts...</p>
      </div>

      <div v-else-if="blogStore.getBlogs.length === 0" class="text-center py-8">
        <p class="text-gray-500">No blog posts found.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="blog in blogStore.getBlogs"
          :key="blog.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="blog.banner || '/public/asset/images/social-image.png'"
            :alt="blog.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
              >
                {{ blog.category }}
              </span>
              <span
                :class="`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                  blog.status
                )}`"
              >
                {{ blog.status }}
              </span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {{ blog.title }}
            </h3>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3">
              {{ blog.excerpt }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">
                By {{ blog.author.name }}
              </span>
              <div class="flex space-x-2">
                <button
                  @click="openEditModal(blog)"
                  class="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Edit
                </button>
                <button
                  @click="openDeleteModal(blog)"
                  class="text-red-600 hover:text-red-900 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Blog Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Add New Blog Post</h3>
        </div>
        <form @submit.prevent="handleAddBlog" class="px-6 py-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="blogForm.title"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Excerpt</label
            >
            <textarea
              v-model="blogForm.excerpt"
              rows="3"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Content</label
            >
            <!-- Rich Text Toolbar -->
            <div
              class="mt-1 mb-2 flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-300 rounded-t-md"
            >
              <button
                type="button"
                @click="formatText('bold')"
                class="p-2 text-sm font-bold hover:bg-gray-200 rounded"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                @click="formatText('italic')"
                class="p-2 text-sm italic hover:bg-gray-200 rounded"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                @click="formatText('underline')"
                class="p-2 text-sm underline hover:bg-gray-200 rounded"
                title="Underline"
              >
                U
              </button>
              <div class="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                type="button"
                @click="formatText('insertUnorderedList')"
                class="p-2 text-sm hover:bg-gray-200 rounded"
                title="Bullet List"
              >
                •
              </button>
              <button
                type="button"
                @click="formatText('insertOrderedList')"
                class="p-2 text-sm hover:bg-gray-200 rounded"
                title="Numbered List"
              >
                1.
              </button>
              <div class="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                type="button"
                @click="formatText('formatBlock', '<h2>')"
                class="p-2 text-sm font-bold hover:bg-gray-200 rounded"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                @click="formatText('formatBlock', '<h3>')"
                class="p-2 text-sm font-bold hover:bg-gray-200 rounded"
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                @click="formatText('formatBlock', '<p>')"
                class="p-2 text-sm hover:bg-gray-200 rounded"
                title="Paragraph"
              >
                P
              </button>
            </div>
            <!-- Rich Text Editor -->
            <div
              id="content-editor"
              class="min-h-[200px] max-h-[400px] overflow-y-auto border border-gray-300 rounded-b-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              contenteditable="true"
              @focus="isContentFocused = true"
              @blur="isContentFocused = false"
              placeholder="Start writing your blog content here..."
            ></div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Category</label
              >
              <select
                v-model="blogForm.category"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Status</label
              >
              <select
                v-model="blogForm.status"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option
                  v-for="status in statusOptions"
                  :key="status.value"
                  :value="status.value"
                >
                  {{ status.label }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Banner Image</label
            >
            <input
              type="file"
              accept="image/*"
              @change="handleBannerUpload"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div v-if="blogForm.banner" class="mt-2">
              <img
                :src="URL.createObjectURL(blogForm.banner)"
                alt="Banner preview"
                class="w-32 h-20 object-cover rounded border"
              />
              <p class="text-xs text-gray-500 mt-1">
                {{ blogForm.banner.name }}
              </p>
            </div>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="blogStore.getIsLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              Add Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Blog Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Edit Blog Post</h3>
        </div>
        <form @submit.prevent="handleEditBlog" class="px-6 py-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="blogForm.title"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Excerpt</label
            >
            <textarea
              v-model="blogForm.excerpt"
              rows="3"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Content</label
            >
            <!-- Rich Text Toolbar -->
            <div
              class="mt-1 mb-2 flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-300 rounded-t-md"
            >
              <button
                type="button"
                @click="formatText('bold')"
                class="p-2 text-sm font-bold hover:bg-gray-200 rounded"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                @click="formatText('italic')"
                class="p-2 text-sm italic hover:bg-gray-200 rounded"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                @click="formatText('underline')"
                class="p-2 text-sm underline hover:bg-gray-200 rounded"
                title="Underline"
              >
                U
              </button>
              <div class="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                type="button"
                @click="formatText('insertUnorderedList')"
                class="p-2 text-sm hover:bg-gray-200 rounded"
                title="Bullet List"
              >
                •
              </button>
              <button
                type="button"
                @click="formatText('insertOrderedList')"
                class="p-2 text-sm hover:bg-gray-200 rounded"
                title="Numbered List"
              >
                1.
              </button>
              <div class="w-px h-6 bg-gray-300 mx-1"></div>
              <button
                type="button"
                @click="formatText('formatBlock', '<h2>')"
                class="p-2 text-sm font-bold hover:bg-gray-200 rounded"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                @click="formatText('formatBlock', '<h3>')"
                class="p-2 text-sm font-bold hover:bg-gray-200 rounded"
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                @click="formatText('formatBlock', '<p>')"
                class="p-2 text-sm hover:bg-gray-200 rounded"
                title="Paragraph"
              >
                P
              </button>
            </div>
            <!-- Rich Text Editor -->
            <div
              id="content-editor"
              class="min-h-[200px] max-h-[400px] overflow-y-auto border border-gray-300 rounded-b-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              contenteditable="true"
              @focus="isContentFocused = true"
              @blur="isContentFocused = false"
              placeholder="Start writing your blog content here..."
            ></div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Category</label
              >
              <select
                v-model="blogForm.category"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Status</label
              >
              <select
                v-model="blogForm.status"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option
                  v-for="status in statusOptions"
                  :key="status.value"
                  :value="status.value"
                >
                  {{ status.label }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Banner Image</label
            >
            <input
              type="file"
              accept="image/*"
              @change="handleBannerUpload"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div v-if="blogForm.banner" class="mt-2">
              <img
                :src="URL.createObjectURL(blogForm.banner)"
                alt="Banner preview"
                class="w-32 h-20 object-cover rounded border"
              />
              <p class="text-xs text-gray-500 mt-1">
                {{ blogForm.banner.name }}
              </p>
            </div>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="blogStore.getIsLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              Update Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Delete Blog Post</h3>
        </div>
        <div class="px-6 py-4">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete "{{ selectedBlog?.title }}"? This
            action cannot be undone.
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeModals"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleDeleteBlog"
            :disabled="blogStore.getIsLoading"
            class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
