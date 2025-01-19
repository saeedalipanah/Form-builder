import { useApiRequest } from "@/composables/common/useApiRequests";
import { authService } from "@/services/api/auth";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
  }),

  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
      localStorage.setItem("access_token", this.accessToken);
    },
    setRefreshToken(token: string) {
      this.refreshToken = token;
      localStorage.setItem("refresh_token", this.refreshToken);
    },

    async refreshAccessToken() {
      const { responseData, sendRequest } = useApiRequest();
      await sendRequest(
        authService.refreshToken({ token: this.refreshToken! })
      );
      this.setAccessToken(responseData.value.data.data.access);
    },

    logout() {
      const router = useRouter();
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push({ name: "login" });
    },
  },
});
