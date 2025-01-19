import { useAuthStore } from "@/stores";
import axios from "axios";
import type { AxiosInstance } from "axios";

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false; 
let failedRequestsQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = []; // Queue for requests waiting for token refresh

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized
          console.error("Unauthorized: Your is not authenticated.");
          authStore.logout();
          break;

        case 403: // Forbidden
          console.error("Forbidden: You do not have access.");
          if (originalRequest.url.includes("/main/main/refresh")) {
            // If refresh token fails, logout the user
            isRefreshing = false;
            authStore.logout();
            return Promise.reject(error);
          }
          
          if (!originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
              isRefreshing = true;
              try {
                await authStore.refreshAccessToken();
                isRefreshing = false;

                // Retry all queued requests
                failedRequestsQueue.forEach(({ resolve }) =>
                  resolve(apiClient(originalRequest))
                );
                failedRequestsQueue = [];
                return apiClient(originalRequest);
              } catch (refreshError) {
                isRefreshing = false;
                failedRequestsQueue.forEach(({ reject }) =>
                  reject(refreshError)
                );
                failedRequestsQueue = [];
                authStore.logout();
                return Promise.reject(refreshError);
              }
            }

            // Queue the current request
            return new Promise((resolve, reject) => {
              failedRequestsQueue.push({ resolve, reject });
            });
          }
          break;

        case 500: // Internal Server Error
          console.error("Server error: Please try again later.");
          break;

        default:
          console.error(`Error: ${error.response.statusText}`);
      }
    } else {
      console.error("Network error or server is unreachable.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
