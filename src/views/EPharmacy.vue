<script setup>
import PageHeader from "@/components/PageHeader.vue";
</script>
<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Page Header -->
    <PageHeader
      title="MedVax Health E-Pharmacy"
      subtitle="Place orders, pick up your orders or have them delivered to you."
    />

    <!-- E-Pharmacy -->

    <!-- Call to action -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-12 my-12 py-12 px-4 sm:px-12 max-w-7xl mx-4 xl:mx-auto justify-self-center cta-container bg-light-blue-100 rounded-lg"
    >
      <div class="flex flex-col items-start gap-2">
        <h2 class="text-lg font-semibold text-left">
          Need to speak to a consultant?
        </h2>
        <p class="text-sm xl:text-base text-left font-normal sm:px-0 w-5/6">
          But our ultimate satisfaction comes from seeing our clients achieve
          their goals and live healthier, happier lives. Talk with a consultant
          today and embark on your own transformative journey towards optimal
          health and well-being.
        </p>
      </div>
      <button
        class="bg-light-blue-900 text-dark font-semibold text-xs py-2 px-4 lg:w-1/6 rounded"
      >
        Book Consultation
      </button>
    </div>
  </div>
</template>

<style scoped></style>
