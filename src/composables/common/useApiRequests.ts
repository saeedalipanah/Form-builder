// useApiRequest.ts
import { useToast } from "@/components/ui/toast";
import { ref } from "vue";

/**
 * A composable for handling API requests.
 * @template T - The expected response data type.
 */
export function useApiRequest<T>() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const responseData = ref<any>(null);
  const { toast } = useToast();

  /**
   * @param apiRequestPromise - The API request promise (e.g., apiClient.post(...)).
   * @returns Promise<void>
   */
  const sendRequest = async (apiRequestPromise: Promise<T>) => {
    isLoading.value = true;
    error.value = null;
    responseData.value = null;
    try {
      const result = await apiRequestPromise;
      responseData.value = result;
    } catch (error: any) {
      error.value = error;
      const apiErrorMessage = error.response?.data?.error?.detail;
      if(apiErrorMessage)
      toast({
        title: "خطایی رخ داده است!",
        description: apiErrorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    responseData,
    sendRequest,
  };
}
