<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { useTeamStore } from "@/store/teamStore";

const router = useRouter();
const authStore = useAuthStore();
const teamStore = useTeamStore();

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedMember = ref(null);

// Form data
const memberForm = ref({
  name: "",
  position: "",
  department: "",
  bio: "",
  image: null,
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
});

const positions = [
  "Chief Executive Officer",
  "Chief Technology Officer",
  "Chief Operations Officer",
  "Medical Doctor",
  "Pharmacist",
  "Software Engineer",
  "Data Scientist",
  "Marketing Manager",
  "Operations Manager",
  "Customer Support",
  "Social Media Manager",
  "Graphics Designer",
  "Other",
];

const departments = [
  "Management",
  "Consultants",
  "Social Media",
  "Operations",
  "Marketing and Communications",
  "Customer Support",
  "IT",
];

const resetForm = () => {
  memberForm.value = {
    name: "",
    position: "",
    department: "",
    bio: "",
    image: null,
    email: "",
    phone: "",
    linkedin: "",
    twitter: "",
  };
};

const openAddModal = () => {
  resetForm();
  showAddModal.value = true;
};

const openEditModal = (member) => {
  selectedMember.value = member;
  memberForm.value = {
    name: member.name,
    position: member.position,
    department: member.department || "",
    bio: member.bio,
    image: null,
    email: member.email,
    phone: member.phone,
    linkedin: member.linkedin,
    twitter: member.twitter,
  };
  showEditModal.value = true;
};

const openDeleteModal = (member) => {
  selectedMember.value = member;
  showDeleteModal.value = true;
};

const closeModals = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showDeleteModal.value = false;
  selectedMember.value = null;
  resetForm();
};

const handleAddMember = async () => {
  try {
    const formData = new FormData();
    for (const key in memberForm.value) {
      if (key === "image" && memberForm.value.image) {
        formData.append("image", memberForm.value.image);
      } else if (key !== "image") {
        formData.append(key, memberForm.value[key]);
      }
    }
    await teamStore.addTeamMember(formData);
    closeModals();
  } catch (error) {
    console.error("Error adding team member:", error);
  }
};

const handleEditMember = async () => {
  try {
    const formData = new FormData();
    for (const key in memberForm.value) {
      if (key === "image" && memberForm.value.image) {
        formData.append("image", memberForm.value.image);
      } else if (key !== "image") {
        formData.append(key, memberForm.value[key]);
      }
    }
    await teamStore.updateTeamMember(selectedMember.value.id, formData);
    closeModals();
  } catch (error) {
    console.error("Error updating team member:", error);
  }
};

const handleDeleteMember = async () => {
  try {
    await teamStore.deleteTeamMember(selectedMember.value.id);
    closeModals();
  } catch (error) {
    console.error("Error deleting team member:", error);
  }
};

onMounted(async () => {
  // Check if user is admin
  if (!authStore.isAdmin) {
    router.push("/login");
    return;
  }

  // Fetch team members
  try {
    await teamStore.fetchTeamMembers();
  } catch (error) {
    console.error("Error fetching team members:", error);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <button
              @click="router.push('/admin/dashboard')"
              class="mr-4 text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
          </div>
          <button
            @click="openAddModal"
            class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Add Team Member
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Team Members Grid -->
      <div v-if="teamStore.getIsLoading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="text-gray-500 mt-4">Loading team members...</p>
      </div>

      <div v-else-if="teamStore.getError" class="text-center py-8">
        <p class="text-red-500">{{ teamStore.getError }}</p>
        <button
          @click="teamStore.fetchTeamMembers()"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>

      <div
        v-else-if="teamStore.getTeamMembers.length === 0"
        class="text-center py-8"
      >
        <p class="text-gray-500">No team members found.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in teamStore.getTeamMembers"
          :key="member._id || member.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div class="relative">
            <img
              :src="member.image || '/asset/images/team/chioma.png'"
              :alt="member.name"
              class="w-full h-48 object-cover"
              @error="$event.target.src = '/asset/images/team/chioma.png'"
            />
            <div class="absolute top-2 right-2 flex space-x-1">
              <button
                @click="openEditModal(member)"
                class="bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="openDeleteModal(member)"
                class="bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">
              {{ member.name }}
            </h3>
            <p class="text-sm text-blue-600 mb-2">{{ member.position }}</p>
            <p v-if="member.department" class="text-xs text-gray-500 mb-3">
              {{ member.department }}
            </p>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3">
              {{ member.bio }}
            </p>
            <div class="flex space-x-2">
              <a
                v-if="member.email"
                :href="`mailto:${member.email}`"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
              </a>
              <a
                v-if="member.linkedin"
                :href="member.linkedin"
                target="_blank"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                v-if="member.twitter"
                :href="member.twitter"
                target="_blank"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Team Member Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Add Team Member</h3>
        </div>
        <form @submit.prevent="handleAddMember" class="px-6 py-4 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="memberForm.name"
                type="text"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Position</label
              >
              <select
                v-model="memberForm.position"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select position</option>
                <option
                  v-for="position in positions"
                  :key="position"
                  :value="position"
                >
                  {{ position }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Department</label
            >
            <select
              v-model="memberForm.department"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              v-model="memberForm.bio"
              rows="3"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Image</label
              >
              <input
                type="file"
                accept="image/*"
                @change="(e) => (memberForm.image = e.target.files[0])"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="memberForm.email"
                type="email"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Phone</label
              >
              <input
                v-model="memberForm.phone"
                type="tel"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >LinkedIn URL</label
              >
              <input
                v-model="memberForm.linkedin"
                type="url"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Twitter URL</label
              >
              <input
                v-model="memberForm.twitter"
                type="url"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="teamStore.getIsLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Team Member Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Edit Team Member</h3>
        </div>
        <form @submit.prevent="handleEditMember" class="px-6 py-4 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="memberForm.name"
                type="text"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Position</label
              >
              <select
                v-model="memberForm.position"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select position</option>
                <option
                  v-for="position in positions"
                  :key="position"
                  :value="position"
                >
                  {{ position }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Department</label
            >
            <select
              v-model="memberForm.department"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              v-model="memberForm.bio"
              rows="3"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Image</label
              >
              <input
                type="file"
                accept="image/*"
                @change="(e) => (memberForm.image = e.target.files[0])"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="memberForm.email"
                type="email"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Phone</label
              >
              <input
                v-model="memberForm.phone"
                type="tel"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >LinkedIn URL</label
              >
              <input
                v-model="memberForm.linkedin"
                type="url"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Twitter URL</label
              >
              <input
                v-model="memberForm.twitter"
                type="url"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="teamStore.getIsLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              Update Member
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      @click.self="closeModals"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Delete Team Member</h3>
        </div>
        <div class="px-6 py-4">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete "{{ selectedMember?.name }}"? This
            action cannot be undone.
          </p>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button
            @click="closeModals"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleDeleteMember"
            :disabled="teamStore.getIsLoading"
            class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
