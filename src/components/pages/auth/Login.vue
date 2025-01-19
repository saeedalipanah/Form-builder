<template>
  <div class="login w-full h-[100vh] flex justify-center items-center">
    <BaseCard
      title="خوش آمدید"
      description="برای ورود، ایمیل و رمز عبور خود را وارد کنید"
      class="max-w-[320px] w-[98%] py-6 px-3"
    >
      <template #card-content>
        <form @submit="onSubmit">
          <BaseInput
            v-model="email"
            v-bind="emailAttrs"
            :error="errors.email"
            label="ایمیل شما"
            placeholder="ایمیل"
            type="email"
          >
            <template #prepend-icon>
              <Mail class="size-5" />
            </template>
          </BaseInput>

          <BaseInput
            v-model="password"
            v-bind="passwordAttrs"
            :error="errors.password"
            label="رمز‌عبور"
            placeholder="رمزعبور"
            :type="passwordIsVisible ? 'text' : 'password'"
          >
            <template #prepend-icon>
              <LockKeyhole class="size-5" />
            </template>
            <template #append-icon>
              <EyeOff
                v-if="passwordIsVisible"
                class="size-5 cursor-pointer"
                @click="passwordIsVisible = false"
              />
              <Eye
                v-else
                class="size-5 cursor-pointer"
                @click="passwordIsVisible = true"
              />
            </template>
          </BaseInput>
          <BaseButton
            :loading="isLoading"
            content="ورود"
            class="w-full mt-3 bg-zinc-700"
            type="submit"
          />
        </form>
      </template>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "@/composables/common/useValidations";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAuthStore } from "@/stores";
import { authService } from "@/services/api/auth";
import type { loginPayloadType } from "@/types/auth";
import { useRouter } from "vue-router";
import { useApiRequest } from "@/composables/common/useApiRequests";
import { ref } from "vue";

const passwordIsVisible = ref<boolean>(false);

const authStore = useAuthStore();
const loginValidationSchema = yup.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: loginValidationSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const router = useRouter();
const { responseData, sendRequest, error, isLoading } = useApiRequest();
const onSubmit = handleSubmit(async (values) => {
  await sendRequest(authService.login(values as loginPayloadType));
  if (!error.value) {
    authStore.setAccessToken(responseData.value?.data?.data?.access);
    authStore.setRefreshToken(responseData.value?.data?.data?.refresh);
    router.push({ name: "forms" });
  }
});
</script>
