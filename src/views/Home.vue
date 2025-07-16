<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useBlogStore } from "@/store/blogStore";
import { useBookingStore } from "@/store/bookingStore";

// Initialize router and blog store
const router = useRouter();
const blogStore = useBlogStore();
const bookingStore = useBookingStore();

// window.location.href = 'https://wa.me/+2349129738935'

// Reactive state
const isLoading = ref(true);

const whatsapp = () => {
  window.location.href = "https://wa.me/+2349129738935";
};

// Book Consultation Modal State
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

// Computed properties
const recentBlogs = computed(() => {
  const allBlogs = blogStore.getBlogs;
  // Sort by date (most recent first) and take the first 3
  return allBlogs
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 3);
});

// Methods
const readMore = (blog) => {
  router.push(`/blog/${blog._id || blog.id}`);
};

const logos = [
  new URL("../../public/asset/images/partners/unfpa.svg", import.meta.url).href,
  new URL("../../public/asset/images/partners/hp.svg", import.meta.url).href,
  new URL(
    "../../public/asset/images/partners/gates_foundation.svg",
    import.meta.url
  ).href,
  new URL(
    "../../public/asset/images/partners/be_change_maker.svg",
    import.meta.url
  ).href,
  new URL("../../public/asset/images/partners/rwanda.svg", import.meta.url)
    .href,
  new URL(
    "../../public/asset/images/partners/world_skills.svg",
    import.meta.url
  ).href,
];

// Duplicate the logos for seamless looping
const duplicatedLogos = [
  ...logos,
  ...logos,
  ...logos,
  ...logos,
  ...logos,
  ...logos,
];

// Fetch blogs when component mounts
onMounted(async () => {
  try {
    await blogStore.fetchBlogs();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Hero Section -->
    <div
      class="flex flex-col sm:grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-12"
    >
      <!-- Hero Image -->
      <img
        src="../../public/asset/images/home-header-alt.svg"
        alt="Healthcare personnel with drug bottles in her hands"
        class="sm:hidden w-full h-auto max-w-full flex self-start"
      />

      <!-- Mobile Phone Desktop -->
      <img
        src="../../public/asset/images/onboarding-dual.svg"
        alt="Healthcare personnel with drug bottles in her hands"
        class="hidden sm:flex w-full h-auto max-w-full mx-auto"
      />

      <!-- Hero Text -->
      <div
        class="flex flex-col items-center sm:items-start gap-4 w-full sm:wmax-w-lg"
      >
        <p class="flex flex-col gap-0 text-xs lg:text-sm px-4 sm:px-0">
          Operational in Nigeria – Expanding across Africa
          <span class="line"></span>
        </p>

        <h1
          class="text-2xl md:text-3xl lg:text-4xl xl:text-6xl lg:w-3/4 text-center sm:text-left capitalize text-dark-blue-900 font-black w-full"
        >
          Transforming medication access through innovation
        </h1>

        <p
          class="text-xs xl:text-base lg:w-3/4 text-center sm:text-left font-medium px-4 sm:px-0"
        >
          Bridging healthcare gaps with low-cost technology, AI-powered supply
          chains, and last-mile delivery solutions to ensure life-saving
          medications, vaccines, and reproductive health products reach those
          who need them the most.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-wrap sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start w-full *:no-underline"
        >
          <a
            href="#"
            target="_blank"
            @click="whatsapp()"
            class="bg-pink-300 shadow text-dark text-center text-xs sm:text-sm px-3 sm:px-4 lg:px-4 py-2 sm:py-2 lg:py-4 rounded-lg hover:bg-bright-blue-900 hover:text-white transition-colors"
          >
            <!-- @click="openBookingModal" -->
            Book a Consultation
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.medvax.medtracka"
            target="_blank"
            class="bg-pink-300 shadow text-dark text-center text-xs sm:text-sm px-3 sm:px-4 lg:px-4 py-2 sm:py-2 lg:py-4 rounded-lg hover:bg-bright-blue-900 hover:text-white transition-colors"
          >
            Download Our App
          </a>
          <router-link
            to="/e-pharmacy"
            class="bg-pink-300 shadow text-dark text-center text-xs sm:text-sm px-3 sm:px-4 lg:px-4 py-2 sm:py-2 lg:py-4 rounded-lg hover:bg-bright-blue-900 hover:text-white transition-colors"
          >
            Visit Our E-Pharmacy
          </router-link>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center my-12">
      <img
        src="../../public/asset/images/onboarding-dual.svg"
        alt="Healthcare personnel with drug bottles in her hands"
        class="sm:hidden w-full h-auto max-w-full mx-auto"
      />
    </div>

    <!-- Overview Section -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 my-16 max-w-7xl mx-auto"
    >
      <h2
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-dark-blue-900 font-black text-center"
      >
        Overview
      </h2>
      <p
        class="text-sm xl:text-base text-center font-normal max-w-3xl px-4 sm:px-0"
      >
        At <span class="font-medium">MedVax Health,</span> we are redefining
        healthcare accessibility through technology and data-driven logistics.
        Our mission is to ensure that no one is left behind in accessing
        essential healthcare services, especially women, girls, and under-served
        communities.
      </p>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center justify-center px-4 w-full xl:w-7xl max-w-7xl"
      >
        <!-- Technology-Driven -->
        <div
          class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-4 rounded bg-light-blue-300 w-full"
        >
          <p
            class="text-lg font-semibold text-dark-blue-900 flex items-center gap-2"
          >
            <img
              src="../../public/asset/icons/tech-driven.svg"
              alt="Technology Driven"
              class="w-12 h-12 bg-light-blue-900 p-2 rounded"
            />
            Technology-Driven
          </p>
          <p class="text-sm text-left">
            We harness AI, data, and digital health tools to enhance healthcare
            delivery.
          </p>
        </div>

        <!-- Patient Centred -->
        <div
          class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-4 rounded bg-light-blue-300 w-full"
        >
          <p
            class="text-lg font-semibold text-dark-blue-900 flex items-center gap-2"
          >
            <img
              src="../../public/asset/icons/patient-centred.svg"
              alt="Patient Centred"
              class="w-12 h-12 bg-light-blue-900 p-2 rounded"
            />
            Patient-Centred Approach
          </p>
          <p class="text-sm text-left">
            Our solutions are tailored to individual and community health needs.
          </p>
        </div>

        <!-- Reliable Supply Chain -->
        <div
          class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-4 rounded bg-light-blue-300 w-full"
        >
          <p
            class="text-lg font-semibold text-dark-blue-900 flex items-center gap-2"
          >
            <img
              src="../../public/asset/icons/supply.svg"
              alt="Reliable Supply Chain"
              class="w-12 h-12 bg-light-blue-900 p-2 rounded"
            />
            Reliable Supply Chain
          </p>
          <p class="text-sm text-left">
            We ensure the continuous availability of essential medications and
            vaccines.
          </p>
        </div>

        <!-- Impact-Focused -->
        <div
          class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-4 rounded bg-light-blue-300 w-full"
        >
          <p
            class="text-lg font-semibold text-dark-blue-900 flex items-center gap-2"
          >
            <img
              src="../../public/asset/icons/impact-focused.svg"
              alt="Impact Focused"
              class="w-12 h-12 bg-light-blue-900 p-2 rounded"
            />
            Impact Focused
          </p>
          <p class="text-sm text-left">
            Committed to closing healthcare gaps for under-served populations.
          </p>
        </div>
      </div>
    </div>

    <!-- Our Services -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 mt-12 max-w-7xl mx-auto"
    >
      <h2
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-dark-blue-900 font-black text-center"
      >
        Our Services
      </h2>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center justify-center px-4"
      >
        <!-- MedTracka 4 Her (Her Paddi) -->
        <div
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-pink-100 rounded gap-4"
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
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-pink-100 rounded gap-4"
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
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-pink-100 rounded gap-4"
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
          class="flex flex-col p-4 sm:p-8 items-center justify-center bg-pink-100 rounded gap-4"
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

    <!-- Our Impact -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 mt-12 py-12 bg-light-blue-900"
    >
      <h2
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-black text-center"
      >
        Our Impact
      </h2>

      <!-- Impact Metrics -->
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center w-full max-w-7xl mx-auto px-4"
      >
        <div
          class="flex flex-col items-start justify-center bg-light-blue-100 p-4 rounded gap-2"
        >
          <p class="text-2xl font-bold text-pink-900">4,500+</p>
          <h3 class="text-lg font-normal text-dark">
            Women <br />
            Reached
          </h3>
        </div>

        <div
          class="flex flex-col items-start justify-center bg-light-blue-100 p-4 rounded gap-2"
        >
          <p class="text-2xl font-bold text-pink-900">7+</p>
          <h3 class="text-lg font-normal text-dark">
            Communities <br />
            Served
          </h3>
        </div>

        <div
          class="flex flex-col items-start justify-center bg-light-blue-100 p-4 rounded gap-2"
        >
          <p class="text-2xl font-bold text-pink-900">4,500+</p>
          <h3 class="text-lg font-normal text-dark">
            Products <br />
            Delivered
          </h3>
        </div>

        <div
          class="flex flex-col items-start justify-center bg-light-blue-100 p-4 rounded gap-2"
        >
          <p class="text-2xl font-bold text-pink-900">8+</p>
          <h3 class="text-lg font-normal text-dark">
            International <br />
            Partners
          </h3>
        </div>
      </div>

      <!-- Testimonials -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center w-full max-w-7xl mx-auto px-4"
      >
        <div
          class="flex flex-col rounded gap-3 pt-4 items-start bg-light-blue-100"
        >
          <img
            src="../../public/asset/icons/double-quotes.svg"
            alt="quotation icon"
            class="ml-4"
          />
          <p class="font-normal text-base text-left mx-4">
            MedVax Health transformed my health journey. Now, I can get my
            medications on time without stress.
          </p>
          <div
            class="flex gap-2 py-6 bg-pink-300 rounded-b w-full items-center px-4"
          >
            <!-- generate avatar -->
            <img
              src="https://ui-avatars.com/api/?name=Aisha"
              alt="User Avatar"
              class="w-8 h-8 rounded-full"
            />
            <p class="text-base">Aisha, Nigeria</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Blog -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 mt-12 py-12"
    >
      <h2
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-dark-blue-900 font-black text-center"
      >
        Our Blog
      </h2>
      <p
        class="text-sm xl:text-base text-center font-normal max-w-3xl px-4 sm:px-0"
      >
        Stay Updated with Healthcare Innovations. Explore the latest in
        healthcare technology, pharmaceutical care, and reproductive health.
      </p>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-light-blue-900"
        ></div>
        <p class="text-gray-500 mt-4">Loading recent blog posts...</p>
      </div>

      <!-- Blog Items -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center w-full max-w-7xl mx-auto px-4 gap-4"
      >
        <div
          v-for="blog in recentBlogs"
          :key="blog._id || blog.id"
          class="flex flex-col rounded gap-3 p-4 items-center bg-light-blue-100 border-1 border-bright-blue-300 hover:shadow-md transition-shadow"
        >
          <img
            :src="blog.banner"
            :alt="blog.title"
            class="w-full h-32 object-cover rounded"
          />
          <h3 class="text-lg font-medium text-dark w-full line-clamp-1">
            {{ blog.title }}
          </h3>
          <p class="text-xs text-left line-clamp-1 w-full -mt-3 mb-4">
            {{ blog.category }}
          </p>

          <p class="text-sm text-left line-clamp-2 w-full">
            {{ blog.excerpt }}
          </p>

          <button
            @click="readMore(blog)"
            class="bg-bright-blue-900 w-full text-center text-white font-normal text-xs py-2 rounded mb-4 hover:bg-bright-blue-800 transition-colors"
          >
            Read More
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!isLoading && recentBlogs.length === 0"
        class="text-center py-8"
      >
        <p class="text-gray-500">No blog posts available at the moment.</p>
      </div>
    </div>

    <!-- Our Partners -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 py-12"
    >
      <h2
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5x text-dark-blue-900 font-black text-center"
      >
        Our Partners
      </h2>
      <p
        class="text-sm xl:text-base text-center font-normal max-w-3xl px-4 sm:px-0"
      >
        <span class="font-medium">MedVax Health,</span> collaborates with global
        and local health organizations, pharmacies, and logistics partners to
        strengthen healthcare access and delivery.
      </p>

      <!-- Slider of Partner Logos -->
      <div class="relative w-full overflow-hidden">
        <div class="slider-track flex gap-8 items-center animate-scroll">
          <img
            v-for="(logo, index) in duplicatedLogos"
            :key="index"
            :src="logo"
            alt="Partner Logo"
            class="h-auto w-28 sm:w-30 object-contain shrink-0"
          />
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
        id="book-consultation"
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
.line {
  width: 100%;
  height: 2px;
  background-color: var(--color-pink-900);
  margin-top: 1px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.slider-track {
  width: max-content;
  animation: scroll 40s linear infinite;
}
</style>
