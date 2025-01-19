import type { formDataType } from "@/types/forms";
import { defineStore } from "pinia";
export const useFormsStore = defineStore("forms", {
  state: () => ({
    forms: [] as formDataType[],
  }),

  actions: {
    setForms(forms: formDataType[]) {
      this.forms = forms;
    },
  },
});
