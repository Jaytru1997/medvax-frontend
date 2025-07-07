import { defineStore, acceptHMRUpdate } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    // set global variables for frontend
    siteName: "Medvax Health",
    siteAddress: "Benin City, Nigeria",
    sitePhone: "+234 912 973 8935",
    siteEmail: "info@medvaxhealth.com",
    siteCurrency: "NGN",
    siteCurrencySymbol: "₦", // $ £ ₦ €
    // url for the website (frontend)
    siteUrl: "https://medvaxhealth.com",
  }),
  getters: {
    getSiteName: (state) => state.siteName,
    getSiteAddress: (state) => state.siteAddress,
    getSitePhone: (state) => state.sitePhone,
    getSiteEmail: (state) => state.siteEmail,
    getSiteCurrency: (state) => state.siteCurrency,
    getSiteCurrencySymbol: (state) => state.siteCurrencySymbol,
    getSiteUrl: (state) => state.siteUrl,
  },
  actions: {},
});

// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingStore, import.meta.hot));
}
