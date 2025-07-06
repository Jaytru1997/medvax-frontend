<script setup>
const logos = [
  new URL("../../asset/images/partner.svg", import.meta.url).href,
  new URL("../../asset/images/partner.svg", import.meta.url).href,
  new URL("../../asset/images/partner.svg", import.meta.url).href,
  new URL("../../asset/images/partner.svg", import.meta.url).href,
  new URL("../../asset/images/partner.svg", import.meta.url).href,
  new URL("../../asset/images/partner.svg", import.meta.url).href,
  new URL("../../asset/images/partner.svg", import.meta.url).href,
  new URL("../../asset/images/partner.svg", import.meta.url).href,
];

// Duplicate the logos for seamless looping
const duplicatedLogos = [...logos, ...logos, ...logos];
</script>

<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Hero Section -->
    <div
      class="flex flex-col sm:grid sm:grid-cols-2 items-center justify-center gap-8 sm:gap-12"
    >
      <!-- Hero Image -->
      <img
        src="../../asset/images/home-header-alt.svg"
        alt="Healthcare personnel with drug bottles in her hands"
        class="w-full h-auto max-w-full flex self-start"
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
          <router-link
            to="#"
            class="bg-pink-300 shadow text-dark text-center text-xs sm:text-sm px-3 sm:px-4 lg:px-4 py-2 sm:py-2 lg:py-4 rounded-lg hover:bg-bright-blue-900 hover:text-white transition-colors"
          >
            Book a Consultation
          </router-link>
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
              src="../../asset/icons/tech-driven.svg"
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
              src="../../asset/icons/patient-centred.svg"
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
              src="../../asset/icons/supply.svg"
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
              src="../../asset/icons/impact-focused.svg"
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
            src="../../asset/images/medtracka-4-her.svg"
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
          <img src="../../asset/images/medtracka.svg" alt="MedTracka" />
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
            src="../../asset/images/medvax-pharmacy.svg"
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
          <img src="../../asset/images/medvax-lab.svg" alt="MedVax Labs" />
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
            src="../../asset/icons/double-quotes.svg"
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

      <!-- Blog Items -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center w-full max-w-7xl mx-auto px-4 gap-4"
      >
        <!-- Blog 1 -->
        <div
          class="flex flex-col rounded gap-3 p-4 items-center bg-light-blue-100 border-1 border-bright-blue-300"
        >
          <img
            src="../../asset/images/home-header.svg"
            alt="MedVax Pharmacies"
          />
          <h3 class="text-lg font-medium text-dark w-full line-clamp-1">
            MedVax Pharmacies
          </h3>
          <p class="text-xs text-left line-clamp-1 w-full -mt-3 mb-4">
            Healthcare Innovation
          </p>

          <p class="text-sm text-left line-clamp-1 w-full">
            A chain of tech-enabled community pharmacies integrating digital
            health services & fast medication delivery.
          </p>

          <button
            class="bg-bright-blue-900 w-full text-center text-white font-normal text-xs py-2 rounded mb-4"
          >
            Read More
          </button>
        </div>

        <!-- Blog 2 -->
        <div
          class="flex flex-col rounded gap-3 p-4 items-center bg-light-blue-100 border-1 border-bright-blue-300"
        >
          <img
            src="../../asset/images/home-header.svg"
            alt="MedVax Pharmacies"
          />
          <h3 class="text-lg font-medium text-dark w-full line-clamp-1">
            MedVax Pharmacies
          </h3>
          <p class="text-xs text-left line-clamp-1 w-full -mt-3 mb-4">
            Healthcare Innovation
          </p>

          <p class="text-sm text-left line-clamp-1 w-full">
            A chain of tech-enabled community pharmacies integrating digital
            health services & fast medication delivery.
          </p>

          <button
            class="bg-bright-blue-900 w-full text-center text-white font-normal text-xs py-2 rounded mb-4"
          >
            Read More
          </button>
        </div>

        <!-- Blog 3 -->
        <div
          class="flex flex-col rounded gap-3 p-4 items-center bg-light-blue-100 border-1 border-bright-blue-300"
        >
          <img
            src="../../asset/images/home-header.svg"
            alt="MedVax Pharmacies"
          />
          <h3 class="text-lg font-medium text-dark w-full line-clamp-1">
            MedVax Pharmacies
          </h3>
          <p class="text-xs text-left line-clamp-1 w-full -mt-3 mb-4">
            Healthcare Innovation
          </p>

          <p class="text-sm text-left line-clamp-1 w-full">
            A chain of tech-enabled community pharmacies integrating digital
            health services & fast medication delivery.
          </p>

          <button
            class="bg-bright-blue-900 w-full text-center text-white font-normal text-xs py-2 rounded mb-4"
          >
            Read More
          </button>
        </div>
      </div>
    </div>

    <!-- Our Partners -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 py-12"
    >
      <h2
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5x font-black text-center"
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
            class="h-auto w-20 sm:w-24 rounded-full object-contain shrink-0"
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
        class="bg-light-blue-900 text-dark font-semibold text-xs py-2 px-4 lg:w-1/6 rounded"
      >
        Book Consultation
      </button>
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

.cta-container {
  background-image: url("../../asset/icons/abstract-design.svg"),
    url("../../asset/icons/logo-icon-faded.svg");
  background-repeat: no-repeat;
  background-size: 3.5rem 3.5rem;
  background-position: top left, bottom right;
}
</style>
