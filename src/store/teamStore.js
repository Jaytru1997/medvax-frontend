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
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Management Team",
            },
            {
              name: "Bob",
              title: "CTO",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Management Team",
            },
            {
              name: "Charlie",
              title: "CFO",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Management Team",
            },
            {
              name: "Diana",
              title: "COO",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Management Team",
            },
            {
              name: "David",
              title: "Senior Consultant",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Consultants",
            },
            {
              name: "Eve",
              title: "Junior Consultant",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Consultants",
            },
            {
              name: "Frank",
              title: "Healthcare Consultant",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Consultants",
            },
            {
              name: "Grace",
              title: "Technology Consultant",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Consultants",
            },
            {
              name: "Hannah",
              title: "Social Media Manager",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Social Media",
            },
            {
              name: "Ian",
              title: "Content Creator",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Social Media",
            },
            {
              name: "Jack",
              title: "Graphic Designer",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Social Media",
            },
            {
              name: "Kathy",
              title: "Community Manager",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Social Media",
            },
            {
              name: "Liam",
              title: "Customer Support Lead",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Customer Support",
            },
            {
              name: "Mia",
              title: "Support Specialist",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Customer Support",
            },
            {
              name: "Noah",
              title: "Technical Support",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Customer Support",
            },
            {
              name: "Olivia",
              title: "Customer Success Manager",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Customer Support",
            },
            {
              name: "Paul",
              title: "Marketing Manager",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Marketing and Communications",
            },
            {
              name: "Quinn",
              title: "PR Specialist",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Marketing and Communications",
            },
            {
              name: "Rita",
              title: "Content Strategist",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
              department: "Marketing and Communications",
            },
            {
              name: "Sam",
              title: "SEO Expert",
              image: new URL(
                "../../public/asset/images/team/chioma.png",
                import.meta.url
              ).href,
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
