// Team Store
import { defineStore, acceptHMRUpdate } from "pinia";

export const useTeamStore = defineStore("team", {
  state: () => ({
    teamMembers: [],
  }),
  getters: {
    getTeamMembers: (state) => state.teamMembers,
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
    fetchTeamMembers() {
      // Simulate an API call to fetch team members
      return new Promise((resolve) => {
        setTimeout(() => {
          this.teamMembers = [
            {
              name: "Alice",
              title: "CEO",
              image: "../../public/asset/images/team/chioma.png",
              department: "Management Team",
            },
            {
              name: "Bob",
              title: "CTO",
              image: "../../public/asset/images/team/chioma.png",
              department: "Management Team",
            },
            {
              name: "Charlie",
              title: "CFO",
              image: "../../public/asset/images/team/chioma.png",
              department: "Management Team",
            },
            {
              name: "Diana",
              title: "COO",
              image: "../../public/asset/images/team/chioma.png",
              department: "Management Team",
            },
            {
              name: "David",
              title: "Senior Consultant",
              image: "../../public/asset/images/team/chioma.png",
              department: "Consultants",
            },
            {
              name: "Eve",
              title: "Junior Consultant",
              image: "../../public/asset/images/team/chioma.png",
              department: "Consultants",
            },
            {
              name: "Frank",
              title: "Healthcare Consultant",
              image: "../../public/asset/images/team/chioma.png",
              department: "Consultants",
            },
            {
              name: "Grace",
              title: "Technology Consultant",
              image: "../../public/asset/images/team/chioma.png",
              department: "Consultants",
            },
            {
              name: "Hannah",
              title: "Social Media Manager",
              image: "../../public/asset/images/team/chioma.png",
              department: "Social Media",
            },
            {
              name: "Ian",
              title: "Content Creator",
              image: "../../public/asset/images/team/chioma.png",
              department: "Social Media",
            },
            {
              name: "Jack",
              title: "Graphic Designer",
              image: "../../public/asset/images/team/chioma.png",
              department: "Social Media",
            },
            {
              name: "Kathy",
              title: "Community Manager",
              image: "../../public/asset/images/team/chioma.png",
              department: "Social Media",
            },
            {
              name: "Liam",
              title: "Customer Support Lead",
              image: "../../public/asset/images/team/chioma.png",
              department: "Customer Support",
            },
            {
              name: "Mia",
              title: "Support Specialist",
              image: "../../public/asset/images/team/chioma.png",
              department: "Customer Support",
            },
            {
              name: "Noah",
              title: "Technical Support",
              image: "../../public/asset/images/team/chioma.png",
              department: "Customer Support",
            },
            {
              name: "Olivia",
              title: "Customer Success Manager",
              image: "../../public/asset/images/team/chioma.png",
              department: "Customer Support",
            },
            {
              name: "Paul",
              title: "Marketing Manager",
              image: "../../public/asset/images/team/chioma.png",
              department: "Marketing and Communications",
            },
            {
              name: "Quinn",
              title: "PR Specialist",
              image: "../../public/asset/images/team/chioma.png",
              department: "Marketing and Communications",
            },
            {
              name: "Rita",
              title: "Content Strategist",
              image: "../../public/asset/images/team/chioma.png",
              department: "Marketing and Communications",
            },
            {
              name: "Sam",
              title: "SEO Expert",
              image: "../../public/asset/images/team/chioma.png",
              department: "Marketing and Communications",
            },
          ];
          resolve(this.teamMembers);
        }, 1000);
      });
    },
    // deleteTeamMember(id) {

    // },
    // addTeamMember(){}
  },
});
// Hot Module Replacement (HMR) for the team store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeamStore, import.meta.hot));
}
