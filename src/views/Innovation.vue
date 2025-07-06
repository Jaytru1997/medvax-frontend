<script setup>
import PageHeader from "@/components/PageHeader.vue";
</script>
<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Page Header -->
    <PageHeader
      title="Our Innovation"
      subtitle="Explore a suite of MedVax Health products tailored to provide cutting edge healthcare services, even in remote and underserved communities."
    />

    <!-- Our Innovation -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 my-12 max-w-7xl mx-auto"
    >
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center justify-center px-4 sm:px-0"
      >
        <!-- MedTracka 4 Her (Her Paddi) -->
        <div
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-light-blue-100 rounded gap-4"
        >
          <img
            src="../../public/asset/images/medtracka-4-her.svg"
            alt="MedTracka 4 Her (Her Paddi)"
            class="w-full"
          />
          <h3 class="text-lg font-semibold text-dark-blue-900 w-full">
            MedTracka 4 Her (Her Paddi)
          </h3>
          <p class="text-sm text-left w-full">
            Women-centric e-pharmacy with discreet teleconsultations & seamless
            delivery of reproductive health products.
          </p>
        </div>

        <!-- MedTracka -->
        <div
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-light-blue-100 rounded gap-4"
        >
          <img src="../../public/asset/images/medtracka.svg" alt="MedTracka" />
          <h3 class="text-lg font-semibold text-dark-blue-900 w-full">
            MedTracka
          </h3>
          <p class="text-sm text-left">
            AI-powered app connecting patients to every licensed pharmacy in
            their city, ensuring medication authentication, refills, and
            consultations.
          </p>
        </div>

        <!-- MedVax Pharmacies -->
        <div
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-light-blue-100 rounded gap-4"
        >
          <img
            src="../../public/asset/images/medvax-pharmacy.svg"
            alt="MedVax Pharmacies"
          />
          <h3 class="text-lg font-semibold text-dark-blue-900 w-full">
            MedVax Pharmacies
          </h3>
          <p class="text-sm text-left">
            A chain of tech-enabled community pharmacies integrating digital
            health services & fast medication delivery.
          </p>
        </div>

        <!-- MedVax Labs -->
        <div
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-light-blue-100 rounded gap-4"
        >
          <img
            src="../../public/asset/images/medvax-lab.svg"
            alt="MedVax Labs"
          />
          <h3 class="text-lg font-semibold text-dark-blue-900 w-full">
            MedVax Labs
          </h3>
          <p class="text-sm text-left">
            Researching African indigenous plants for innovative pharmaceutical
            & reproductive health solutions.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
