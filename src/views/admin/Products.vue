<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";

const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductStore();

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedProduct = ref(null);

// Form data
const productForm = ref({
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
  stock: "",
  prescription: false,
});

const categories = [
  "Pain Relief",
  "Antibiotics",
  "Vitamins",
  "First Aid",
  "Personal Care",
  "Reproductive Health",
  "Chronic Disease",
  "Other",
];

const resetForm = () => {
  productForm.value = {
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    prescription: false,
  };
};

const openAddModal = () => {
  resetForm();
  showAddModal.value = true;
};

const openEditModal = (product) => {
  selectedProduct.value = product;
  productForm.value = {
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    stock: product.stock,
    prescription: product.prescription || false,
  };
  showEditModal.value = true;
};

const openDeleteModal = (product) => {
  selectedProduct.value = product;
  showDeleteModal.value = true;
};

const closeModals = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showDeleteModal.value = false;
  selectedProduct.value = null;
  resetForm();
};

const handleAddProduct = async () => {
  try {
    await productStore.addProduct(productForm.value);
    closeModals();
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const handleEditProduct = async () => {
  try {
    await productStore.updateProduct(
      selectedProduct.value.id,
      productForm.value
    );
    closeModals();
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const handleDeleteProduct = async () => {
  try {
    await productStore.deleteProduct(selectedProduct.value.id);
    closeModals();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

onMounted(async () => {
  // Check if user is admin
  if (!authStore.isAdmin) {
    router.push("/login");
    return;
  }

  // Fetch products
  try {
    await productStore.fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
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
            Add Product
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Products Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Products</h3>
        </div>

        <div v-if="productStore.getIsLoading" class="text-center py-8">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <p class="text-gray-500 mt-4">Loading products...</p>
        </div>

        <div
          v-else-if="productStore.getProducts.length === 0"
          class="text-center py-8"
        >
          <p class="text-gray-500">No products found.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in productStore.getProducts" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        :src="
                          product.image ||
                          '/public/asset/images/products/demo/ibuprofen.png'
                        "
                        :alt="product.name"
                        class="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ product.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ product.description }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₦{{ product.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ product.stock }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.prescription
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`"
                  >
                    {{ product.prescription ? "Prescription" : "OTC" }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    @click="openEditModal(product)"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    @click="openDeleteModal(product)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Add Product Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Add New Product</h3>
        </div>
        <form @submit.prevent="handleAddProduct" class="px-6 py-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="productForm.name"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="productForm.description"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Price</label
              >
              <input
                v-model="productForm.price"
                type="number"
                step="0.01"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Stock</label
              >
              <input
                v-model="productForm.stock"
                type="number"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Category</label
            >
            <select
              v-model="productForm.category"
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
              >Image URL</label
            >
            <input
              v-model="productForm.image"
              type="url"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center">
            <input
              v-model="productForm.prescription"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900"
              >Requires Prescription</label
            >
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
              :disabled="productStore.getIsLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Edit Product</h3>
        </div>
        <form @submit.prevent="handleEditProduct" class="px-6 py-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="productForm.name"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="productForm.description"
              rows="3"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Price</label
              >
              <input
                v-model="productForm.price"
                type="number"
                step="0.01"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Stock</label
              >
              <input
                v-model="productForm.stock"
                type="number"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Category</label
            >
            <select
              v-model="productForm.category"
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
              >Image URL</label
            >
            <input
              v-model="productForm.image"
              type="url"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center">
            <input
              v-model="productForm.prescription"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900"
              >Requires Prescription</label
            >
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
              :disabled="productStore.getIsLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Delete Product</h3>
        </div>
        <div class="px-6 py-4">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete "{{ selectedProduct?.name }}"? This
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
            @click="handleDeleteProduct"
            :disabled="productStore.getIsLoading"
            class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
