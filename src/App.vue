<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1">
      <router-view />
    </main>

    <AppFooter />
    <!-- <AdaAIWidget /> -->
    <FloatingCart />
    <FloatingChatWidget />
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
// import AdaAIWidget from "./components/AdaAIWidget.vue";
import FloatingCart from "./components/FloatingCart.vue";
import FloatingChatWidget from "./components/FloatingChatWidget.vue";
</script>

<style scoped>
/* Optional base styles */
</style>
