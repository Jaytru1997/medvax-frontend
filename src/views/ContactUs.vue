<script setup>
import { useSettingStore } from "@/store/settingStore";
const settingStore = useSettingStore();

import { ref } from "vue";
import { useBookingStore } from "@/store/bookingStore";
const whatsapp = () => {
  window.location.href = "https://wa.me/+2349129738935";
};
const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});
const handleSubmit = () => {
  // Build mailto link
  const to = settingStore.siteEmail;
  const subject = encodeURIComponent(
    `Contact Form Submission from ${formData.value.name}`
  );
  const body = encodeURIComponent(
    `Name: ${formData.value.name}\nEmail: ${formData.value.email}\nPhone: ${formData.value.phone}\n\nMessage:\n${formData.value.message}`
  );
  const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, "_blank");
  // Optionally reset the form after opening mail client
  formData.value = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
};

// Book Consultation Modal State
const bookingStore = useBookingStore();
const showBookingModal = ref(false);
const bookingForm = ref({
  name: "",
  email: "",
  phone: "",
  slotId: "",
});

const openBookingModal = async () => {
  showBookingModal.value = true;
  bookingStore.clearBookingStatus();
  bookingForm.value = { name: "", email: "", phone: "", slotId: "" };
  try {
    await bookingStore.fetchSlots();
  } catch (e) {}
};
const closeBookingModal = () => {
  showBookingModal.value = false;
  bookingStore.clearBookingStatus();
};
const submitBooking = async () => {
  if (
    !bookingForm.value.name ||
    !bookingForm.value.email ||
    !bookingForm.value.phone ||
    !bookingForm.value.slotId
  ) {
    alert("Please fill in all fields and select a slot.");
    return;
  }
  try {
    await bookingStore.bookAppointment({
      slotId: bookingForm.value.slotId,
      name: bookingForm.value.name,
      email: bookingForm.value.email,
      phone: bookingForm.value.phone,
    });
  } catch (e) {}
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
          src="../../public/asset/icons/logo-icon-black.svg"
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
            class="flex flex-col items-center justify-center gap-2 sm:gap-4 rounded py-4 px-4 cursor-pointer border-1 border-bright-blue-900 w-3/4 lg:w-1/4 bg-dark-blue-700"
          >
            <img
              src="../../public/asset/icons/email-faded.svg"
              alt="email icon"
              class="w-5 h-5"
            />
            {{ settingStore.siteEmail }}
          </p>

          <p
            class="flex flex-col items-center justify-center gap-2 sm:gap-4 rounded py-4 px-4 cursor-pointer border-1 border-bright-blue-900 w-3/4 lg:w-1/4 bg-dark-blue-700"
          >
            <img
              src="../../public/asset/icons/phone-faded.svg"
              alt="phone icon"
              class="w-5 h-5"
            />
            {{ settingStore.sitePhone }}
          </p>

          <p
            class="flex flex-col items-center justify-center gap-2 sm:gap-4 rounded py-4 px-4 cursor-pointer border-1 border-bright-blue-900 w-3/4 lg:w-1/4 bg-dark-blue-700"
          >
            <img
              src="../../public/asset/icons/location-pin-faded.svg"
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
            src="../../public/asset/images/map.svg"
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
                src="../../public/asset/icons/linked-in-dark.svg"
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
                src="../../public/asset/icons/x-dark.svg"
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
        @click="whatsapp()"
      >
        <!-- @click="openBookingModal" -->
        Book Consultation
      </button>
    </div>

    <!-- Book Consultation Modal -->
    <div
      v-if="showBookingModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeBookingModal"
    >
      <div
        class="bg-white rounded-2xl shadow-deep w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div
          class="bg-gradient-to-r from-light-blue-500 to-light-blue-700 text-white p-6 flex items-center justify-between"
        >
          <h2 class="text-xl font-bold">Book Consultation</h2>
          <button
            @click="closeBookingModal"
            class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="submitBooking" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Full Name *</label
              >
              <input
                v-model="bookingForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email *</label
              >
              <input
                v-model="bookingForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Phone Number *</label
              >
              <input
                v-model="bookingForm.phone"
                type="tel"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
                placeholder="+234 123 456 7890"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Select Slot *</label
              >
              <select
                v-model="bookingForm.slotId"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light-blue-500 focus:border-transparent"
              >
                <option value="" disabled>Select a slot</option>
                <option
                  v-for="slot in bookingStore.getSlots"
                  :key="slot.id || slot._id"
                  :value="slot.id || slot._id"
                >
                  {{
                    slot.time ||
                    slot.label ||
                    slot.startTime ||
                    slot.date ||
                    slot.name ||
                    slot.id
                  }}
                </option>
              </select>
            </div>
            <div
              v-if="bookingStore.getBookingError"
              class="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <p class="text-red-600 text-sm">
                {{ bookingStore.getBookingError }}
              </p>
            </div>
            <div
              v-if="bookingStore.getBookingSuccess"
              class="bg-green-50 border border-green-200 rounded-lg p-3"
            >
              <p class="text-green-700 text-sm">
                Appointment booked successfully! Check your email for
                confirmation.
              </p>
            </div>
            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeBookingModal"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="
                  bookingStore.getIsLoading || bookingStore.getBookingSuccess
                "
                class="flex-1 px-4 py-3 bg-gradient-to-r from-light-blue-500 to-light-blue-700 text-white rounded-lg hover:from-light-blue-700 hover:to-light-blue-800 transition-colors disabled:opacity-50"
              >
                <span v-if="bookingStore.getIsLoading">Booking...</span>
                <span v-else>Book Now</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-header {
  background-image: url("../../public/asset/icons/header-abstract.svg");
  background-repeat: no-repeat;
  background-position: top;
  background-size: 30rem;
}
</style>
