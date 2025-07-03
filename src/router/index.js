import { createRouter, createWebHistory } from "vue-router";

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
    path: "/contact-us",
    name: "Contact Us",
    component: () => import("../views/ContactUs.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("../views/Privacy.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
