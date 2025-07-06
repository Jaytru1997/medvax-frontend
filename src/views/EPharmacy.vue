<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";

// Initialize stores
const productStore = useProductStore();
const cartStore = useCartStore();

// Reactive state for quantity inputs
const productQuantities = ref({});

// Search and filter state
const searchQuery = ref("");
const priceRange = ref({ min: 0, max: 1000 });
const selectedCategory = ref("All");

// Computed properties
const allProducts = computed(() => productStore.getProducts || []);
const cartItemCount = computed(() => cartStore.getCartItemCount);
const totalCartPrice = computed(() => cartStore.getTotalCartPrice);
const isLoading = ref(true);

// Filtered products based on search and filters
const products = computed(() => {
  let filtered = allProducts.value;

  // Filter by search query
  if (searchQuery.value.trim()) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by price range
  filtered = filtered.filter(
    (product) =>
      product.price >= priceRange.value.min &&
      product.price <= priceRange.value.max
  );

  // Filter by category (if implemented in the future)
  if (selectedCategory.value !== "All") {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory.value
    );
  }

  return filtered;
});

// Get unique categories for filter
const categories = computed(() => {
  const cats = new Set(
    allProducts.value.map((product) => product.category || "General")
  );
  return ["All", ...Array.from(cats)];
});

// Methods
const addToCart = (product) => {
  const quantity = productQuantities.value[product.id] || 1;
  cartStore.addToCart({
    ...product,
    quantity: quantity,
  });

  // Reset quantity after adding to cart
  productQuantities.value[product.id] = 1;
};

const updateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) newQuantity = 1;
  productQuantities.value[productId] = newQuantity;
};

const clearFilters = () => {
  searchQuery.value = "";
  priceRange.value = { min: 0, max: 1000 };
  selectedCategory.value = "All";
};

// Fetch products when component mounts
onMounted(async () => {
  try {
    await productStore.fetchProducts();

    // Initialize quantities for all products
    products.value.forEach((product) => {
      productQuantities.value[product.id] = 1;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Page Header -->
    <PageHeader
      title="MedVax Health E-Pharmacy"
      subtitle="Place orders, pick up your orders or have them delivered to you."
    />

    <!-- E-Pharmacy -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-light-blue-900"
        ></div>
        <p class="text-gray-500 mt-4">Loading products...</p>
      </div>

      <!-- Search and Filter Section -->
      <div v-else class="mb-8">
        <!-- Search Bar -->
        <div class="mb-6">
          <div class="relative max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-light-blue-500 focus:border-transparent bg-white shadow-sm"
            />
            <svg
              class="absolute left-4 top-4 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Filters -->
        <div
          class="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-xl"
        >
          <!-- Category Filter -->
          <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700">Category:</label>
            <select
              v-model="selectedCategory"
              class="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue-500 focus:border-transparent bg-white shadow-sm"
            >
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Price Range Filter -->
          <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700">Price:</label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="priceRange.min"
                type="number"
                placeholder="Min"
                class="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue-500 focus:border-transparent bg-white shadow-sm"
              />
              <span class="text-gray-500">-</span>
              <input
                v-model.number="priceRange.max"
                type="number"
                placeholder="Max"
                class="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          <!-- Clear Filters Button -->
          <button
            @click="clearFilters"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-white transition-colors bg-white shadow-sm"
          >
            Clear Filters
          </button>
        </div>

        <!-- Results Count -->
        <div
          class="mt-4 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm inline-block"
        >
          Showing {{ products.length }} of {{ allProducts.length }} products
        </div>
      </div>

      <!-- Products Grid -->
      <div
        v-if="!isLoading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          <!-- Product Image Container -->
          <div class="relative aspect-square bg-gray-50 overflow-hidden">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <!-- Category Badge -->
            <div class="absolute top-3 left-3">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-blue-100 text-light-blue-800"
              >
                {{ product.category || "General" }}
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-5">
            <!-- Product Name and Price -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {{ product.name }}
              </h3>
              <p class="text-2xl font-bold text-pink-600">
                ₦{{ product.price.toLocaleString() }}
              </p>
            </div>

            <!-- Quantity Selector -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-600">Qty:</span>
              <div class="flex items-center bg-gray-50 rounded-lg p-1">
                <button
                  @click="
                    updateQuantity(
                      product.id,
                      (productQuantities[product.id] || 1) - 1
                    )
                  "
                  class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  :value="productQuantities[product.id] || 1"
                  @input="
                    updateQuantity(
                      product.id,
                      parseInt($event.target.value) || 1
                    )
                  "
                  min="1"
                  class="w-12 text-center bg-transparent text-sm font-medium focus:outline-none"
                />
                <button
                  @click="
                    updateQuantity(
                      product.id,
                      (productQuantities[product.id] || 1) + 1
                    )
                  "
                  class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button
              @click="addToCart(product)"
              class="w-full bg-gradient-to-r from-light-blue-500 to-light-blue-700 text-white py-3 px-4 rounded-lg hover:from-light-blue-700 hover:to-light-blue-800 transition-all duration-200 font-medium flex items-center justify-center gap-2 group-hover:shadow-lg"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!products || products.length === 0" class="text-center py-12">
        <div class="mb-4">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p class="text-gray-500 text-lg mb-2">
          {{
            searchQuery ||
            priceRange.min > 0 ||
            priceRange.max < 1000 ||
            selectedCategory !== "All"
              ? "No products match your search criteria."
              : "No products available at the moment."
          }}
        </p>
        <button
          v-if="
            searchQuery ||
            priceRange.min > 0 ||
            priceRange.max < 1000 ||
            selectedCategory !== 'All'
          "
          @click="clearFilters"
          class="text-light-blue-600 hover:text-light-blue-800 font-medium"
        >
          Clear all filters
        </button>
      </div>
    </div>

    <!-- Call to action -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-12 my-12 py-12 px-4 sm:px-12 max-w-7xl mx-4 xl:mx-auto justify-self-center cta-container bg-light-blue-100 rounded-lg"
    >
      <div class="flex flex-col items-start gap-2">
        <h2 class="text-lg font-semibold text-left">
          Need to speak to a consultant?
        </h2>
        <p class="text-sm xl:text-base text-left font-normal sm:px-0 w-5/6">
          But our ultimate satisfaction comes from seeing our clients achieve
          their goals and live healthier, happier lives. Talk with a consultant
          today and embark on your own transformative journey towards optimal
          health and well-being.
        </p>
      </div>
      <button
        class="bg-light-blue-900 text-dark font-semibold text-xs py-2 px-4 lg:w-1/6 rounded"
      >
        Book Consultation
      </button>
    </div>
  </div>
</template>

<style scoped></style>
