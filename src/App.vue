<template>
  <div class="min-h-screen flex flex-col bg-white text-dark font-inter">
    <AppHeader />

    <main class="flex-1">
      <router-view />
    </main>

    <AppFooter />
    <AdaAIWidget />
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AdaAIWidget from "./components/AdaAIWidget.vue";
</script>

<style scoped>
/* Optional base styles */
</style>
