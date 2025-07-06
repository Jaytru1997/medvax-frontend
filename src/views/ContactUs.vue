<script setup>
import { useSettingStore } from "@/store/settingStore";
const settingStore = useSettingStore();

import { ref } from "vue";
const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});
const handleSubmit = () => {
  // Here you would typically send the form data to your backend
  console.log("Form submitted:", formData.value);
  // Reset the form after submission
  formData.value = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
};
</script>
<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Page Header -->
    <div class="flex flex-col items-center justify-center gap-8 my-12 px-4">
      <div
        class="flex flex-col items-center justify-center gap-8 bg-light-blue-100 my-12 pt-12 rounded-lg contact-header w-full xl:max-w-7xl"
      >
        <img
          src="../../asset/icons/logo-icon-black.svg"
          alt=""
          class="bg-gradient-to-b from-light-blue-500 to-light-blue-300 p-2 rounded-lg w-16 h-16 border-3 border-white"
        />
        <h2 class="my-4 text-2xl sm:text-4xl font-semibold font-urbanist">
          Contact Us
        </h2>
        <p
          class="text-xs sm:text-base text-center font-normal font-urbanist px-4 sm:px-0 w-5/6"
        >
          We value your feedback, questions, and concerns at MedVax Health. Our
          dedicated team is here to assist you and provide the support you need
          on your nutritional journey. Please don't hesitate to reach out to us
          using any of the following contact methods
        </p>
        <div
          class="bg-dark-blue-900 flex flex-wrap items-center justify-center py-4 gap-4 *:text-white w-full rounded-b-lg text--xs"
        >
          <!-- Dynamically set teams and implement border-1 border-bright-blue-100 for selected team -->
          <p
            class="flex flex-col items-center justify-center gap-4 rounded py-4 px-4 cursor-pointer border-1 border-bright-blue-900 w-3/4 lg:w-1/4 bg-dark-blue-700"
          >
            <img
              src="../../asset/icons/email-faded.svg"
              alt="email icon"
              class="w-5 h-5"
            />
            {{ settingStore.siteEmail }}
          </p>

          <p
            class="flex flex-col items-center justify-center gap-4 rounded py-4 px-4 cursor-pointer border-1 border-bright-blue-900 w-3/4 lg:w-1/4 bg-dark-blue-700"
          >
            <img
              src="../../asset/icons/phone-faded.svg"
              alt="phone icon"
              class="w-5 h-5"
            />
            {{ settingStore.sitePhone }}
          </p>

          <p
            class="flex flex-col items-center justify-center gap-4 rounded py-4 px-4 cursor-pointer border-1 border-bright-blue-900 w-3/4 lg:w-1/4 bg-dark-blue-700"
          >
            <img
              src="../../asset/icons/location-pin-faded.svg"
              alt="location icon"
              class="w-5 h-5"
            />
            {{ settingStore.siteAddress }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 mt-12 py-4 sm:py-12 px-4 sm:px-0 bg-light-blue-300"
    >
      <div
        class="flex flex-col lg:flex-row items-start justify-center gap-8 sm:gap-4 my-12 py-8 w-full xl:mx-auto xl:max-w-7xl"
      >
        <form
          class="sm:px-8 rounded-lg w-full gap-12"
          @submit.prevent="handleSubmit"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-0 mb-4">
            <div class="flex flex-col">
              <label for="name">Full Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                class="p-2 border border-gray-300 rounded sm:w-6/6"
                v-model="formData.name"
                autocomplete="name"
                required
              />
            </div>
            <div class="flex flex-col">
              <label for="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                class="p-2 border border-gray-300 rounded sm:w-6/6"
                v-model="formData.email"
                autocomplete="email"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-1 my-4 xl:my-6">
            <label for="phone">Phone Number</label>
            <!-- phone -->
            <input
              type="tel"
              placeholder="Enter Your Phone Number"
              class="p-2 border border-gray-300 rounded"
              v-model="formData.phone"
              autocomplete="tel"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            class="w-full p-2 border border-gray-300 rounded my-4 xl:my-6"
            v-model="formData.message"
            rows="4"
            maxlength="250"
            required
          ></textarea>
          <button
            type="submit"
            class="w-full mt-4 bg-pink-300 text-dark font-semibold py-4 px-4 rounded hover:bg-pink-500 transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
        <div class="flex flex-col w-full">
          <img
            src="../../asset/images/map.svg"
            alt="Map"
            class="w-full xl:w-5/6 h-auto rounded-lg flex self-end"
          />
          <!-- Social Icons -->
          <p
            class="flex items-center gap-2 py-[6px] *:bg-pink-300 *:hover:bg-pink-500 *:rounded *:p-4 w-full justify-end"
          >
            <a
              href="https://www.linkedin.com/company/medvax-health"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../../asset/icons/linked-in-dark.svg"
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
                src="../../asset/icons/x-dark.svg"
                alt="x.com icon"
                class="w-5 h-5"
              />
            </a>
          </p>
        </div>
      </div>
    </div>

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

<style scoped>
.contact-header {
  background-image: url(../../asset/icons/header-abstract.svg);
  background-repeat: no-repeat;
  background-position: top;
  background-size: 30rem;
}
</style>
