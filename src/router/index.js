import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const routes = [
  { path: "/", name: "Home", component: () => import("../views/Home.vue") },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/innovation",
    name: "Innovation",
    component: () => import("../views/Innovation.vue"),
  },
  {
    path: "/e-pharmacy",
    name: "E-Pharmacy",
    component: () => import("../views/EPharmacy.vue"),
  },
  { path: "/blog", name: "Blog", component: () => import("../views/Blog.vue") },
  {
    path: "/blog/:id",
    name: "SingleBlog",
    component: () => import("../views/SingleBlog.vue"),
  },
  {
    path: "/contact-us",
    name: "Contact Us",
    component: () => import("../views/ContactUs.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("../views/Privacy.vue"),
  },
  // Authentication routes
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  // Admin routes
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("../views/admin/Dashboard.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/products",
    name: "AdminProducts",
    component: () => import("../views/admin/Products.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/bookings",
    name: "AdminBookings",
    component: () => import("../views/admin/Bookings.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/team",
    name: "AdminTeam",
    component: () => import("../views/admin/Team.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/chatbot",
    name: "AdminChatbot",
    component: () => import("../views/admin/Chatbot.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/blog",
    name: "AdminBlog",
    component: () => import("../views/admin/Blog.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  // Manager routes
  {
    path: "/manager/dashboard",
    name: "ManagerDashboard",
    component: () => import("../views/manager/Dashboard.vue"),
    meta: { requiresAuth: true, requiresManager: true },
  },
  {
    path: "/manager/blog",
    name: "ManagerBlog",
    component: () => import("../views/manager/Blog.vue"),
    meta: { requiresAuth: true, requiresManager: true },
  },
  {
    path: "/manager/analytics",
    name: "ManagerAnalytics",
    component: () => import("../views/manager/Analytics.vue"),
    meta: { requiresAuth: true, requiresManager: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.getIsAuthenticated) {
    next("/login");
    return;
  }

  // Check if route requires admin role
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next("/login");
    return;
  }

  // Check if route requires manager role
  if (to.meta.requiresManager && !authStore.isManager) {
    next("/login");
    return;
  }

  // If user is authenticated and trying to access login/register, redirect to appropriate dashboard
  if (
    authStore.getIsAuthenticated &&
    (to.name === "Login" || to.name === "Register")
  ) {
    if (authStore.isAdmin) {
      next("/admin/dashboard");
    } else if (authStore.isManager) {
      next("/manager/dashboard");
    } else {
      next("/");
    }
    return;
  }

  next();
});

export default router;
