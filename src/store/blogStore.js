// Blog Store
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getBlogs: (state) => state.blogs,
    getBlogById: (state) => (id) =>
      state.blogs.find((blog) => blog._id === id || blog.id === id),
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
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
  },

  actions: {
    // Fetch all blog posts
    async fetchBlogs() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_URL}/api/blog`);
        this.blogs = response.data.data || response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        this.error = error.response?.data?.message || "Failed to fetch blogs";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Get a single blog post by ID
    async fetchBlogById(id) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_URL}/api/blog/${id}`);
        return response.data.data || response.data;
      } catch (error) {
        console.error("Error fetching blog:", error);
        this.error = error.response?.data?.message || "Failed to fetch blog";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Create a new blog post
    async createBlog(blogData, token) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(`${API_URL}/api/blog`, blogData, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(blogData instanceof FormData
              ? {}
              : { "Content-Type": "application/json" }),
          },
        });

        // Add the new blog to the state
        const newBlog = response.data.data || response.data;
        this.blogs.unshift(newBlog);
        return newBlog;
      } catch (error) {
        console.error("Error creating blog:", error);
        this.error = error.response?.data?.message || "Failed to create blog";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Update a blog post
    async updateBlog(id, blogData, token) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.put(
          `${API_URL}/api/blog/${id}`,
          blogData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              ...(blogData instanceof FormData
                ? {}
                : { "Content-Type": "application/json" }),
            },
          }
        );

        // Update the blog in the state
        const updatedBlog = response.data.data || response.data;
        const index = this.blogs.findIndex(
          (blog) => blog._id === id || blog.id === id
        );
        if (index !== -1) {
          this.blogs[index] = updatedBlog;
        }

        return updatedBlog;
      } catch (error) {
        console.error("Error updating blog:", error);
        this.error = error.response?.data?.message || "Failed to update blog";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Delete a blog post
    async deleteBlog(id, token) {
      try {
        this.isLoading = true;
        this.error = null;

        await axios.delete(`${API_URL}/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Remove the blog from the state
        this.blogs = this.blogs.filter(
          (blog) => blog._id !== id && blog.id !== id
        );
        return true;
      } catch (error) {
        console.error("Error deleting blog:", error);
        this.error = error.response?.data?.message || "Failed to delete blog";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Clear error
    clearError() {
      this.error = null;
    },

    // Clear blogs
    clearBlogs() {
      this.blogs = [];
    },
  },
});

// Hot Module Replacement (HMR) for the blog store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot));
}
