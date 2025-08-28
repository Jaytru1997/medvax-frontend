<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Screening Details</h1>
    <div v-if="!screening">
      <p class="text-gray-500">Loading screening details...</p>
    </div>
    <div v-else>
      <div
        class="mb-8 bg-white shadow-lg border border-gray-200 rounded-xl p-6 transition hover:shadow-xl"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Ref No.</div>
            <div class="font-semibold text-gray-800">
              {{ screening.screeningRefNo }}
            </div>
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Name</div>
            <div class="font-semibold text-gray-800">{{ screening.name }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Email</div>
            <div class="text-gray-700">{{ screening.email }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Phone</div>
            <div class="text-gray-700">{{ screening.phone_number }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">City</div>
            <div class="text-gray-700">{{ screening.city }}</div>
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">State</div>
            <div class="text-gray-700">{{ screening.state }}</div>
          </div>
        </div>
        <div class="mb-4">
          <div class="text-xs text-gray-500 uppercase mb-1">Tests</div>
          <ul class="list-disc ml-6 text-gray-700">
            <li v-for="test in screening.tests" :key="test">{{ test }}</li>
          </ul>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Price</div>
            <div class="font-semibold text-blue-700">
              ₦{{ screening.price?.toLocaleString() }}
            </div>
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Status</div>
            <span
              v-if="screening.isApproved"
              class="inline-block px-2 py-1 rounded bg-green-100 text-green-700 font-semibold text-sm"
              >Approved</span
            >
            <span
              v-else
              class="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-semibold text-sm"
              >Pending</span
            >
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Date</div>
            <div class="text-gray-700">
              {{
                screening.isApproved
                  ? screening.screening_details.date
                  : "Not set"
              }}
            </div>
          </div>
          <div>
            <div class="text-xs text-gray-500 uppercase mb-1">Location</div>
            <div class="text-gray-700">
              {{
                screening.isApproved
                  ? screening.screening_details.location
                  : "Not set"
              }}
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-4">
          <button
            type="button"
            @click="showUpdateForm = true"
            class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            type="button"
            @click="handleDelete"
            :disabled="isLoading"
            class="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            Delete
          </button>
          <button
            type="button"
            @click="goBack"
            class="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Back
          </button>
        </div>

        <transition name="fade">
          <div
            v-if="showUpdateForm"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <div
              class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative"
            >
              <button
                type="button"
                @click="showUpdateForm = false"
                class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                aria-label="Close"
              >
                &times;
              </button>
              <form @submit.prevent="handleUpdate" class="space-y-5">
                <h2 class="text-lg font-bold mb-3 text-blue-700">
                  Update Screening
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700"
                      >Date</label
                    >
                    <input
                      type="datetime-local"
                      v-model="updateForm.date"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700"
                      >Location</label
                    >
                    <input
                      type="text"
                      v-model="updateForm.location"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1 text-gray-700"
                      >Status</label
                    >
                    <select
                      v-model="updateForm.isApproved"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option :value="true">Approved</option>
                      <option :value="false">Pending</option>
                    </select>
                  </div>
                </div>
                <div
                  v-if="errorMsg"
                  class="bg-red-50 border border-red-200 rounded p-2 text-red-700"
                >
                  {{ errorMsg }}
                </div>
                <div class="flex flex-wrap gap-3 mt-4">
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    @click="handleDelete"
                    :disabled="isLoading"
                    class="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    @click="goBack"
                    class="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useScreeningStore } from "@/store/screeningStore";

const route = useRoute();
const router = useRouter();
const screeningStore = useScreeningStore();

const screeningId = route.params.id;
const isLoading = ref(false);
const errorMsg = ref("");
const showUpdateForm = ref(false);

const screening = computed(() => screeningStore.getScreeningById(screeningId));

const updateForm = ref({
  date: "",
  location: "",
  isApproved: false,
});

onMounted(() => {
  if (!screening.value) {
    screeningStore.fetchScreeningData();
  }
  // Pre-fill form if data exists
  if (screening.value) {
    updateForm.value.date = screening.value.isApproved
      ? screening.value.screening_details.date
      : "";
    updateForm.value.location = screening.value.isApproved
      ? screening.value.screening_details.location
      : "";
    updateForm.value.isApproved = screening.value.isApproved;
  }
});

const handleUpdate = async () => {
  errorMsg.value = "";
  isLoading.value = true;
  try {
    await screeningStore.updateScreening(screeningId, {
      ...screening.value,
      screening_details: {
        date: updateForm.value.date,
        location: updateForm.value.location,
      },
      isApproved: updateForm.value.isApproved,
    });
    await screeningStore.fetchScreeningData();
    router.push("/admin/screening");
  } catch (err) {
    errorMsg.value = screeningStore.getError || "Failed to update screening.";
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this screening?")) return;
  isLoading.value = true;
  try {
    await screeningStore.deleteScreening(screeningId);
    await screeningStore.fetchScreeningData();
    router.push("/admin/screening");
  } catch (err) {
    errorMsg.value = screeningStore.getError || "Failed to delete screening.";
  } finally {
    isLoading.value = false;
  }
};

function goBack() {
  router.push("/admin/screening");
}
</script>
