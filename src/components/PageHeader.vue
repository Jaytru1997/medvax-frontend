<script setup>
defineProps({
  title: {
    type: String,
    default: "Title",
  },
  subtitle: {
    type: String,
    default:
      "This is a subtitle of the page. It provides context and information about the content that follows.",
  },
});
</script>
<template>
  <!-- Page Header -->
  <div
    class="flex flex-col items-center justify-center gap-8 bg-light-blue-100 my-12 py-12 px-4 max-w-7xl mx-4 xl:mx-auto rounded-lg page-header"
  >
    <img
      src="../../public/asset/icons/logo-icon-black.svg"
      alt=""
      class="bg-gradient-to-b from-light-blue-500 to-light-blue-300 p-2 rounded-lg w-16 h-16 border-3 border-white"
    />
    <h2
      class="my-4 text-2xl sm:text-4xl font-semibold font-urbanist text-center"
    >
      {{ title }}
    </h2>
    <p
      class="text-xs sm:text-base text-center font-normal font-urbanist px-4 sm:px-0 w-5/6"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
.page-header {
  background-image: url("../../public/asset/icons/header-abstract.svg");
  background-repeat: no-repeat;
  background-position: top;
  background-size: 30rem;
}
</style>
