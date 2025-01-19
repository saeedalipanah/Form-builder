import apiClient from "@/plugins/axios";
import type { loginPayloadType } from "@/types/auth";

export const authService = {
  login(credentials: loginPayloadType) {
    return apiClient.post("/main/main/signup", credentials);
  },
  refreshToken(params: { token: string }) {
    return apiClient.post("/main/main/refresh", null, { params: params });
  },
};
