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
      <nav class="hidden lg:flex gap-2 *:no-underline items-center">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'mr-4 hover:text-light-blue-900 transition',
            route.path === link.to
              ? 'text-light-blue-900 font-semibold'
              : 'text-white',
            link.name === 'Contact Us'
              ? 'bg-light-blue-900 rounded py-2 px-4'
              : '',
          ]"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="lg:hidden" @click="toggleSidebar">
        <svg
          width="26"
          height="18"
          viewBox="0 0 26 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.25 1.5625C0.25 0.975697 0.725697 0.5 1.3125 0.5H24.6875C25.2743 0.5 25.75 0.975697 25.75 1.5625C25.75 2.1493 25.2743 2.625 24.6875 2.625H1.3125C0.725697 2.625 0.25 2.1493 0.25 1.5625ZM0.25 9C0.25 8.4132 0.725697 7.9375 1.3125 7.9375H24.6875C25.2743 7.9375 25.75 8.4132 25.75 9C25.75 9.5868 25.2743 10.0625 24.6875 10.0625H1.3125C0.725697 10.0625 0.25 9.5868 0.25 9ZM11.9375 16.4375C11.9375 15.8507 12.4132 15.375 13 15.375H24.6875C25.2743 15.375 25.75 15.8507 25.75 16.4375C25.75 17.0243 25.2743 17.5 24.6875 17.5H13C12.4132 17.5 11.9375 17.0243 11.9375 16.4375Z"
            fill="#FFFFFF"
          />
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile Sidebar -->
  <transition name="fade">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/40 z-40 lg:hidden"
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
            :class="[
              route.path === link.to
                ? 'text-light-blue-900 font-semibold'
                : 'text-white',
              link.name === 'Contact Us'
                ? 'bg-light-blue-900 rounded py-2 px-4'
                : '',
            ]"
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
