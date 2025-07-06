<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { ref, onMounted, computed } from "vue";
import { useTeamStore } from "@/store/teamStore";

// Initialize the team store
const teamStore = useTeamStore();

// Default team selection
const selectedTeam = ref("Management Team");

// Computed properties to get teams and members from the store
const teams = computed(() => {
  const departments = teamStore.getTeamDepartments;
  return departments.map((dept) => ({
    name: dept,
    members: teamStore.getTeamMembersByDepartment(dept),
  }));
});

const selectTeam = (teamName) => {
  selectedTeam.value = teamName;
};

// Fetch team members when component mounts
onMounted(async () => {
  await teamStore.fetchTeamMembers();
});
</script>
<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Page Header -->
    <PageHeader
      title="Who we are"
      subtitle="MedVax Health is a health technology company on a mission to bridge healthcare gaps through low-cost technology, resilient anti-counterfeit supply chains, and last-mile delivery solutions. We ensure that regardless of geographical barriers, climate disruptions and fragmented healthcare supply chains, life-saving medications, vaccines, and reproductive health products reach the most vulnerable communities, and those who need them most, with a special commitment to bridging the health equity gap for women and girls. We are currently operational in Nigeria, with a vision to expand across Africa."
    />

    <!-- Why Choose Us? -->
    <div
      class="flex flex-col items-center justify-center gap-8 sm:gap-12 my-16 max-w-7xl mx-auto"
    >
      <h2
        class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-dark-blue-900 font-semibold text-center"
      >
        Why Choose MedVax Health?
      </h2>

      <!-- Why Choose Us Content -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center justify-center px-4 w-full xl:w-7xl max-w-7xl"
      >
        <!-- Technology-Driven -->
        <div class="content-card flex flex-col items-start">
          <div
            class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-8 rounded bg-light-blue-300 w-full"
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
              We harness AI, data, and digital health tools to enhance
              healthcare delivery.
            </p>
          </div>
        </div>

        <!-- Patient Centred -->
        <div class="content-card flex flex-col items-start">
          <div
            class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-8 rounded bg-light-blue-300 w-full"
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
              Our solutions are tailored to individual and community health
              needs.
            </p>
          </div>
        </div>

        <!-- Reliable Supply Chain -->
        <div class="content-card flex flex-col items-start">
          <div
            class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-8 rounded bg-light-blue-300 w-full"
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
        </div>

        <!-- Impact-Focused -->
        <div class="content-card flex flex-col items-start">
          <div
            class="flex flex-col items-start gap-2 border-1 border-light-blue-500 p-8 rounded bg-light-blue-300 w-full"
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

    <!-- Our Team Of Experts -->
    <div class="flex flex-col items-center justify-center gap-8 my-12">
      <div
        class="flex flex-col items-center justify-center gap-8 bg-light-blue-100 my-12 pt-12 max-w-7xl mx-4 xl:mx-auto rounded-lg team-header"
      >
        <img
          src="../../asset/icons/logo-icon-black.svg"
          alt=""
          class="bg-gradient-to-b from-light-blue-500 to-light-blue-300 p-2 rounded-lg w-16 h-16 border-3 border-white"
        />
        <h2 class="my-4 text-2xl sm:text-4xl font-semibold font-urbanist">
          Our Team Of Experts
        </h2>
        <p
          class="text-xs sm:text-base text-center font-normal font-urbanist px-4 sm:px-0 w-5/6"
        >
          Our team combines a decade of experience in Healthcare (Pharmaceutical
          care), Technology, and Logistics to drive growth in emerging markets.
          "At MedVax Health, we are committed to leveraging technology in
          bridging health equity gaps in Africa." <br />
          - Chioma Uzoma
        </p>
        <div
          class="bg-dark-blue-900 flex flex-wrap items-center justify-center py-4 gap-4 *:text-white w-full rounded-b-lg text--xs"
        >
          <!-- Dynamically set teams and implement border-1 border-bright-blue-100 for selected team -->
          <p
            v-for="team in teams"
            :key="team.name"
            class="rounded py-3 px-2 cursor-pointer"
            :class="{
              'border-1 border-bright-blue-100': team.name === selectedTeam,
            }"
            @click="selectTeam(team.name)"
          >
            {{ team.name }}
          </p>
        </div>
      </div>

      <!-- Our Team Of Experts  -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center w-full max-w-7xl mx-auto px-4"
      >
        <div
          v-for="member in teams.find((team) => team.name === selectedTeam)
            ?.members || []"
          :key="member.name"
          class="flex flex-col items-start justify-center rounded-lg"
        >
          <img
            :src="member.image"
            alt="Team Member Image"
            class="w-full h-auto rounded-lg -mb-14"
          />
          <div
            class="flex flex-col items-start px-4 py-6 bg-pink-100 rounded-tr-lg w-3/4"
          >
            <h3 class="text-lg font-semibold text-dark-blue-900">
              {{ member.name }}
            </h3>
            <p class="text-sm font-semibold text-dark">{{ member.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call To Action -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-12 my-12 py-12 px-4 sm:px-12 max-w-7xl mx-4 xl:mx-auto justify-self-center cta-container bg-light-blue-100 rounded-lg"
    >
      <div class="flex flex-col items-start gap-2">
        <h2 class="text-lg font-semibold text-left">
          Join Us in Revolutionizing Healthcare
        </h2>
        <p class="text-sm xl:text-base text-left font-normal sm:px-0 w-5/6">
          Through innovation, strategic partnerships, and community-driven
          solutions, we are building the future of accessible, affordable, and
          equitable healthcare in Africa. At MedVax Health, we believe that
          healthcare is a fundamental right, not a privilege.
        </p>
      </div>
      <button
        class="bg-light-blue-900 text-dark font-semibold text-xs py-2 px-4 lg:w-1/6 rounded"
      >
        Join Us
      </button>
    </div>
  </div>
</template>

<style scoped>
.content-card {
  font-family: var(--font-urbanist);
  position: relative;
  padding-top: 6rem;
  counter-increment: content-card;
}

.content-card::after {
  content: counter(content-card, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -10;
  font-size: 100px;
  font-weight: bold;
  color: #2d3b61;
}

.team-header {
  background-image: url(../../asset/icons/header-abstract.svg);
  background-repeat: no-repeat;
  background-position: top;
  background-size: 30rem;
}
</style>
