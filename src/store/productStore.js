import { defineStore, acceptHMRUpdate } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    // set global variables for frontend
    products: [],
  }),
  getters: {
    getProducts: (state) => state.products,
    getProductById: (state) => (id) =>
      state.products.find((product) => product.id === id),
    getProductByName: (state) => (name) =>
      state.products.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      ),
    getProductByPriceRange: (state) => (minPrice, maxPrice) =>
      state.products.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      ),
    getProductByCategory: (state) => (category) =>
      state.products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      ),
    getProductCount: (state) => state.products.length,
    getTotalProductPrice: (state) =>
      state.products.reduce((total, product) => total + product.price, 0),
    getProductImages: (state) => state.products.map((product) => product.image),
    getProductNames: (state) => state.products.map((product) => product.name),
    getProductPrices: (state) => state.products.map((product) => product.price),
    getProductIds: (state) => state.products.map((product) => product.id),
    getProductDetails: (state) => (id) => {
      const product = state.products.find((product) => product.id === id);
      return product
        ? {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category || "General",
          }
        : null;
    },
  },
  actions: {
    fetchProducts() {
      // Simulate an API call to fetch products
      return new Promise((resolve) => {
        setTimeout(() => {
          this.products = [
            {
              id: 1,
              name: "Pads",
              price: 100,
              category: "Hygiene",
              image: new URL(
                "../../asset/images/products/demo/pads.png",
                import.meta.url
              ).href,
            },
            {
              id: 2,
              name: "Ibuprofen",
              price: 200,
              category: "Pain Relief",
              image: new URL(
                "../../asset/images/products/demo/ibuprofen.png",
                import.meta.url
              ).href,
            },
            {
              id: 3,
              name: "Mosquito Net",
              price: 300,
              category: "Protection",
              image: new URL(
                "../../asset/images/products/demo/mosquito-net.png",
                import.meta.url
              ).href,
            },
            {
              id: 4,
              name: "Pregnancy Test Strip",
              price: 150,
              category: "Reproductive Health",
              image: new URL(
                "../../asset/images/products/demo/pregnancy-test-strip.png",
                import.meta.url
              ).href,
            },
            {
              id: 5,
              name: "Clear Blue",
              price: 250,
              category: "Reproductive Health",
              image: new URL(
                "../../asset/images/products/demo/clear-blue.png",
                import.meta.url
              ).href,
            },
          ];
          resolve(this.products);
        }, 1000);
      });
    },
    // setProducts(products) {
    //   this.products = products;
    // },
    addProduct(product) {
      this.products.push(product);
    },
    removeProduct(productId) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
    },
  },
});

// make sure to pass the right store definition, `useProductStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
