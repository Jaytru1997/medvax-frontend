// Team Store
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useTeamStore = defineStore("team", {
  state: () => ({
    teamMembers: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getTeamMembers: (state) => state.teamMembers,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getTeamMemberById: (state) => (id) =>
      state.teamMembers.find((member) => member.id === id),
    getTeamMemberCount: (state) => state.teamMembers.length,
    getTeamDepartments: (state) => {
      const departments = new Set();
      state.teamMembers.forEach((member) => {
        departments.add(member.department);
      });
      return Array.from(departments);
    },
    getTeamDepartmentsCount: (state) => {
      return state.teamMembers.reduce((acc, member) => {
        acc[member.department] = (acc[member.department] || 0) + 1;
        return acc;
      }, {});
    },
    getTeamMembersByDepartment: (state) => (department) => {
      return state.teamMembers.filter(
        (member) => member.department === department
      );
    },
  },

  actions: {
    // Fetch all team members
    async fetchTeamMembers() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_URL}/api/team-members`);
        this.teamMembers = response.data.data || response.data;
      } catch (error) {
        console.error("Error fetching team members:", error);
        this.error =
          error.response?.data?.message || "Failed to fetch team members";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Add new team member
    async addTeamMember(memberData) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.post(
          `${API_URL}/api/team-members`,
          memberData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              ...(memberData instanceof FormData
                ? { "Content-Type": "multipart/form-data" }
                : {}),
            },
          }
        );

        // Add to local state
        const newMember = response.data.data || response.data;
        this.teamMembers.push(newMember);
      } catch (error) {
        console.error("Error adding team member:", error);
        this.error =
          error.response?.data?.message || "Failed to add team member";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Update team member
    async updateTeamMember(id, memberData) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.put(
          `${API_URL}/api/team-members/${id}`,
          memberData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              ...(memberData instanceof FormData
                ? { "Content-Type": "multipart/form-data" }
                : {}),
            },
          }
        );

        // Update in local state
        const updatedMember = response.data.data || response.data;
        const index = this.teamMembers.findIndex(
          (member) => member._id === id || member.id === id
        );
        if (index !== -1) {
          this.teamMembers[index] = updatedMember;
        }
      } catch (error) {
        console.error("Error updating team member:", error);
        this.error =
          error.response?.data?.message || "Failed to update team member";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Delete team member
    async deleteTeamMember(id) {
      try {
        this.isLoading = true;
        this.error = null;

        await axios.delete(`${API_URL}/api/team-members/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        // Remove from local state
        this.teamMembers = this.teamMembers.filter(
          (member) => member._id !== id && member.id !== id
        );
      } catch (error) {
        console.error("Error deleting team member:", error);
        this.error =
          error.response?.data?.message || "Failed to delete team member";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Clear error
    clearError() {
      this.error = null;
    },
  },
});

// Hot Module Replacement (HMR) for the team store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeamStore, import.meta.hot));
}
