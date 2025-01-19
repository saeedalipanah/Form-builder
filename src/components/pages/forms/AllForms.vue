<template>
  <div class="all-forms-wrapper w-10/12 mx-auto mt-10">
    <PageHeader title="فرم ها">
      <BaseButton @click="$router.push({ name: 'addForm' })"
        ><Plus />ایجاد فرم</BaseButton
      >
    </PageHeader>
    <section class="bg-background p-4 pb-0 rounded-xl my-4">
      <div
        v-if="forms?.length"
        class="forms flex flex-col justify-between min-h-[80vh]"
      >
        <ul
          v-if="isLoading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <li v-for="i in 6" :key="i" class="form">
            <BaseSkeleton class="h-56 rounded-xl" />
          </li>
        </ul>
        <ul v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <li v-for="(form, i) in forms" :key="i" class="form">
            <FormCard
              :id="form.form_id"
              :title="form.form_title"
              :date="form.created_at"
            />
          </li>
        </ul>
        <div class="flex justify-center items-center w-full md:w-4/12 mx-auto mt-4">
          <BasePagination
            v-model:page="page"
            :total
            :per-page="6"
            class="row-span-2"
          ></BasePagination>
        </div>
      </div>
      <div
        v-else-if="!isLoading"
        class="empty-forms min-h-[80vh] flex justify-center items-center"
      >
        <p class="text-muted-foreground">هیچ فرمی تا به حال ساخته نشده است!</p>
        <RouterLink :to="{ name: 'addForm' }" class="text-blue-500 ms-3"
          >ایجاد فرم</RouterLink
        >
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FormCard from "@/components/common/layout/CardForm.vue";
import { useApiRequest } from "@/composables/common/useApiRequests";
import { formsService } from "@/services/api/forms";
import { Plus } from "lucide-vue-next";
import PageHeader from "@/components/common/layout/PageHeader.vue";
import type { formDataType } from "@/types/forms";
import { useFormsStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const formsStore = useFormsStore();
const forms = computed<formDataType[]>(() => formsStore.forms);
const total = ref<number | null>(null);
const page = ref<number>(1);
const perPage = ref<number>(6);
const { responseData, sendRequest, isLoading, error } = useApiRequest();
const fetchForms = async () => {
  if (route.query.lastItemDeleted && page.value > 1) {
    //Pagination update after delete the last item of one page
    page.value--;
    router.replace({
      path: route.path,
      query: {},
    });
  }
  const params: URLSearchParams = new URLSearchParams();
  params.append("page", String(page.value));
  params.append("per_page", String(perPage.value));
  sessionStorage.setItem("forms_page", String(page.value));
  await sendRequest(formsService.fetchForms(params));
  if (!error.value) {
    formsStore.setForms(responseData.value?.data?.data?.data);
    total.value = responseData.value?.data?.data?.totla_quantity;
  }
};

if (sessionStorage.getItem("forms_page")) {
  page.value = Number(sessionStorage.getItem("forms_page"));
}
fetchForms();

watch(page, () => {
  fetchForms();
});
</script>
