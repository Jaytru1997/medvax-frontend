<template>
  <!-- Top Bar -->
  <header class="bg-light-blue-900 text-white p-4 shadow">
    <div class="container mx-auto flex justify-center items-center">
      <p
        class="text-xs sm:text-lg font-normal text-center flex items-center gap-1"
      >
        <img
          src="../../asset/icons/join-movement.svg"
          alt="Join the movement icon"
          class="w-5 h-5 sm:w-6 sm:h-6"
        />
        Join the Movement – Be a Part of the Future of Healthcare!
      </p>
    </div>
  </header>

  <!-- Main Nav -->
  <header class="bg-dark-blue-900 text-white p-4 shadow">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <img
        src="../../asset/logo/logo-nav.svg"
        alt="MedVax logo"
        class="w-24 sm:w-40"
      />

      <!-- Desktop Navigation -->
      <nav class="hidden sm:flex gap-2 *:no-underline">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'mr-4 hover:text-light-blue-900 transition',
            route.path === link.to
              ? 'text-light-blue-900 font-semibold'
              : 'text-white',
          ]"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="sm:hidden" @click="toggleSidebar">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile Sidebar -->
  <transition name="fade">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/40 z-40 sm:hidden"
      @click.self="closeSidebar"
    >
      <aside class="bg-dark-blue-900 text-white w-64 h-full p-6 shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <img
            src="../../asset/logo/logo-nav.svg"
            alt="MedVax logo"
            class="w-24"
          />
          <button @click="closeSidebar">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav class="flex flex-col gap-4">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="hover:text-light-blue-900 transition no-underline"
            :class="
              route.path === link.to
                ? 'text-light-blue-900 font-semibold'
                : 'text-white'
            "
            @click="closeSidebar"
          >
            {{ link.name }}
          </router-link>
        </nav>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Innovation", to: "/innovation" },
  { name: "E-Pharmacy", to: "/e-pharmacy" },
  { name: "Blog", to: "/blog" },
  { name: "Contact Us", to: "/contact-us" },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
