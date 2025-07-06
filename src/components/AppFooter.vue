<template>
  <footer class="bg-light-blue-900 text-white text-sm py-8">
    <div class="container mx-auto px-4">
      <!-- Top Section -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-4"
      >
        <!-- Footer Logo -->
        <img
          src="../../public/asset/logo/logo-footer.svg"
          alt="MedVax logo"
          class="w-24 lg:w-40"
        />

        <!-- Footer Links -->
        <nav
          class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="hover:text-light-blue-900 transition no-underline text-xs lg:text-base"
            :class="
              route.path === link.to
                ? 'text-dark-blue-900 font-semibold'
                : 'text-white'
            "
          >
            {{ link.name }}
          </router-link>
        </nav>

        <!-- Go to Top -->
        <div
          class="flex justify-start sm:justify-center items-center w-full sm:w-auto"
        >
          <router-link
            to="#"
            class="flex items-center gap-0 text-white hover:text-dark-blue-900 transition no-underline text-xs lg:text-base"
            @click.prevent="scrollToTop"
            title="Go to top"
            aria-label="Go to top"
            data-testid="go-to-top"
          >
            <span>Go To Top </span>
            <img
              src="../../public/asset/icons/arrow-up.svg"
              alt="up arrow icon"
              class="w-8 h-8 bg-dark-blue-900 rounded-full shadow"
            />
          </router-link>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="bg-dark-blue-900 text-white py-4 px-4 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-light"
      >
        <!-- Contact and Socials -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Email -->
          <p
            class="flex items-center gap-1 border-1 border-bright-blue-900 rounded px-2 py-1"
          >
            <img
              src="../../public/asset/icons/email.svg"
              alt="email icon"
              class="w-5 h-5"
            />
            {{ settingStore.siteEmail }}
          </p>

          <!-- Phone -->
          <p
            class="flex items-center gap-1 border-1 border-bright-blue-900 rounded px-2 py-1"
          >
            <img
              src="../../public/asset/icons/phone.svg"
              alt="phone icon"
              class="w-5 h-5"
            />
            {{ settingStore.sitePhone }}
          </p>

          <!-- Location -->
          <p
            class="flex items-center gap-1 border-1 border-bright-blue-900 rounded px-2 py-1"
          >
            <img
              src="../../public/asset/icons/location-pin.svg"
              alt="location icon"
              class="w-5 h-5"
            />
            {{ settingStore.siteAddress }}
          </p>

          <!-- Social Icons -->
          <p
            class="flex items-center gap-2 border-1 border-bright-blue-900 rounded px-2 py-[6px]"
          >
            <a
              href="https://www.linkedin.com/company/medvax-health"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../../public/asset/icons/linked-in.svg"
                alt="linkedin icon"
                class="w-5 h-5"
              />
            </a>
            <a
              href="https://x.com/medvaxhealth?s=21"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../../public/asset/icons/x.svg"
                alt="x.com icon"
                class="w-5 h-5"
              />
            </a>
          </p>
        </div>

        <!-- Copyright -->
        <p
          class="text-xs sm:text-sm text-center sm:text-right w-full sm:w-auto"
        >
          &copy; {{ new Date().getFullYear() }} MedVax Health. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSettingStore } from "@/store/settingStore";
import { useRoute } from "vue-router";

const route = useRoute();
const settingStore = useSettingStore();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Innovation", to: "/innovation" },
  { name: "E-Pharmacy", to: "/e-pharmacy" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact-us" },
  { name: "Privacy", to: "/privacy" },
];
</script>
