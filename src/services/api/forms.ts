export const fetchFormsPath = "/main/main/forms";
export const createFormPath = "/main/main/form";
import apiClient from "@/plugins/axios";
import type { formDataType } from "@/types/forms";

export const formsService = {
  fetchForms(params: URLSearchParams) {
    return apiClient.get("/main/main/forms", { params });
  },
  fetchForm(params: URLSearchParams) {
    return apiClient.get("/main/main/form", { params });
  },
  addForm(formData: formDataType) {
    return apiClient.post("/main/main/form", formData);
  },
  updateForm(payload: { formData: formDataType; params: URLSearchParams }) {
    return apiClient.put("/main/main/form", payload.formData, {
      params: payload.params,
    });
  },
  removeForm(params: URLSearchParams) {
    return apiClient.delete("/main/main/form", { params });
  },
};
