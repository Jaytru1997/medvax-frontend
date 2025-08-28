<script setup>
import { ref, computed, onMounted } from "vue";
import { useScreeningStore } from "@/store/screeningStore";
import { useRouter } from "vue-router";

const screeningStore = useScreeningStore();
const router = useRouter();

const approvalFilter = ref("all");

onMounted(() => {
  screeningStore.fetchScreeningData();
});

const filteredScreenings = computed(() => {
  if (approvalFilter.value === "all") {
    return screeningStore.getScreeningData;
  } else if (approvalFilter.value === "approved") {
    return screeningStore.getScreeningData.filter((s) => s.isApproved);
  } else {
    return screeningStore.getScreeningData.filter((s) => !s.isApproved);
  }
});

function goToDetails(id) {
  router.push(`/admin/screening/${id}`);
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Screenings</h1>
    <div class="mb-4 flex items-center gap-4">
      <label class="font-medium">Filter by Approval:</label>
      <select v-model="approvalFilter" class="border rounded px-3 py-2">
        <option value="all">All</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
      </select>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ref No.
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Approval
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="screening in filteredScreenings"
            :key="screening.id || screening._id"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              {{ screening.screeningRefNo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ screening.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ screening.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ screening.phone_number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                v-if="screening.isApproved"
                class="text-green-600 font-semibold"
                >Approved</span
              >
              <span v-else class="text-yellow-600 font-semibold">Pending</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                class="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
                @click="goToDetails(screening.id || screening._id)"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="filteredScreenings.length === 0"
        class="text-center py-8 text-gray-500"
      >
        No screenings found for this filter.
      </div>
    </div>
  </div>
</template>
