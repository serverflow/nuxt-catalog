import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
  state: () => ({
    search: "",
    category: "",
  }),
  actions: {
    updateFilters(newFilters) {
      this.search = newFilters.search;
      this.category = newFilters.category;
    },
  },
});
