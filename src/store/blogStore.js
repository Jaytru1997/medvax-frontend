// Blog Store
import { defineStore, acceptHMRUpdate } from "pinia";
export const useBlogStore = defineStore("blog", {
  state: () => ({
    // set global variables for frontend
    blogs: [],
  }),
  getters: {
    getBlogs: (state) => state.blogs,
    getBlogById: (state) => (id) => state.blogs.find((blog) => blog.id === id),
    getBlogByTitle: (state) => (title) =>
      state.blogs.find(
        (blog) => blog.title.toLowerCase() === title.toLowerCase()
      ),
    getBlogCount: (state) => state.blogs.length,
    getBlogCategories: (state) => {
      const categories = new Set();
      state.blogs.forEach((blog) => {
        if (blog.category) {
          categories.add(blog.category);
        }
      });
      return Array.from(categories);
    },
    getBlogsByCategory: (state) => (category) => {
      return state.blogs.filter(
        (blog) =>
          blog.category &&
          blog.category.toLowerCase() === category.toLowerCase()
      );
    },
  },
  actions: {
    fetchBlogs() {
      // Simulate an API call to fetch blogs
      return new Promise((resolve) => {
        setTimeout(() => {
          this.blogs = [
            {
              id: 1,
              title: "The Role of AI in Medication Access",
              category: "Healthcare Innovation",
              excerpt:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              banner: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              content:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              date: "2024-01-15",
            },
            {
              id: 2,
              title:
                "Breaking Barriers: Reproductive Health Solutions for Rural Communities ",
              category: "Reproductive Health & Rights",
              excerpt:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              banner: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              content:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              date: "2024-01-10",
            },
            {
              id: 3,
              title:
                "They transformed my health journey. Now, I can get my medications on time without stress.",
              category: "MedVax Impact Stories",
              excerpt:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              banner: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              content:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              date: "2024-01-05",
            },
            {
              id: 4,
              title:
                "Why Tech-Enabled Pharmacies Are the Future of Healthcare in Africa",
              category: "Pharmacy & Medication Access",
              excerpt:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              banner: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              content:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              date: "2024-01-01",
            },
            {
              id: 5,
              title:
                "Why Tech-Enabled Pharmacies Are the Future of Healthcare in Africa",
              category: "Others",
              excerpt:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              banner: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              content:
                "Lorem ipsum dolor sit amet consectetur. Commodo faucibus vitae amet orci in eu. In dolor dolor elementum vitae ut eget. Justo faucibus feugiat pretium nulla cursus volutpat dignissim. Id sed sit.",
              date: "2023-12-28",
            },
          ];
          resolve(this.blogs);
        }, 1000);
      });
    },
  },
});
// Hot Module Replacement (HMR) for the blog store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot));
}
