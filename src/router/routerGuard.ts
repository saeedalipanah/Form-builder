import { useAuthStore } from "@/stores";
import { computed } from "vue";

export const authGuard = (_to: any, _from: any, next: any) => {
  const authStore = useAuthStore();
  const accessToken = computed(() => authStore.accessToken);
  if (!accessToken.value) {
    next({ name: "login" });
  } else {
    next();
  }
};
