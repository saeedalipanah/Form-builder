<template>
  <div class="all-forms-wrapper w-11/12 max-w-[1200px] mx-auto mt-10">
    <form @submit.prevent="formSubmit">
      <PageHeader :title="`${isEditForm ? 'ویرایش فرم' : 'ایجاد فرم'}`">
        <div class="form-actions">
          <BaseButton
            v-if="isEditForm"
            :disabled="addFormLoading || updateFormLoading"
            variant="outline"
            class="me-3 shadow-none"
            @click="removeDialog = true"
            ><Trash />حذف فرم</BaseButton
          >
          <BaseButton
            :loading="addFormLoading || updateFormLoading"
            type="submit"
            ><Check />ذخیره فرم</BaseButton
          >
        </div>
      </PageHeader>
      <BaseSkeleton
        v-if="getSingleFormLoading"
        class="h-60 rounded-xl bg-background my-4"
      />
      <section v-else class="bg-background p-4 rounded-xl mt-4">
        <BasicFormInfo
          v-model:form_title="formData.form_title"
          v-model:form_type="formData.form_type"
          v-model:description="formData.description"
          :is-edit-form="isEditForm"
        />
      </section>
      <BaseSkeleton
        v-if="getSingleFormLoading"
        class="h-48 rounded-xl bg-background mb-4"
      />
      <section
        v-else-if="formData.form_type === formTypeEnum.PUBLIC"
        class="bg-background p-4 rounded-xl mt-4"
      >
        <UserFormInfo />
      </section>

      <ul v-if="getSingleFormLoading">
        <li v-for="i in 3" :key="i" class="form">
          <BaseSkeleton class="bg-background h-48 rounded-xl mb-4" />
        </li>
      </ul>
      <TransitionGroup v-else tag="div" name="fade">
        <section
          v-for="(section, index) in formData.sections"
          :key="section.id"
          class="bg-background p-4 rounded-xl mt-4"
        >
          <FormItemContainer
            v-model:title="section.title"
            v-model:type="section.type"
            v-model:required="section.required"
            :move-up-disabled="index === 0"
            :move-down-disabled="index === formData.sections?.length! - 1"
            @on-remove-section="removeSection(section.id!)"
            @on-copy-section="copySection(section)"
            @on-move-up="moveSection('up', index)"
            @on-move-down="moveSection('down', index)"
          >
            <component
              :is="components[section.type]"
              v-model:properties="section.properties"
            ></component>
          </FormItemContainer>
        </section>
      </TransitionGroup>
      <BaseButton
        :disabled="addFormLoading || getSingleFormLoading"
        class="my-4 bg-background text-foreground w-full py-6"
        @click="addSection"
      >
        <Plus />
        پرسش جدید
      </BaseButton>
    </form>
  </div>
  <BaseConfirmationDialog
    v-model="removeDialog"
    :cancel-disabled="removeFormLoading"
    :accept-loading="removeFormLoading"
    :accept-disabled="removeFormLoading"
    title="حذف فرم"
    description="آیا از حذف فرم مطمئن هستید؟"
    @on-cancel="removeDialog = false"
    @on-accept="removeForm"
  />
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import BasicFormInfo from "./BasicFormInfo.vue";
import UserFormInfo from "./UserFormInfo.vue";
import FormItemContainer from "@/components/common/layout/FormItemContainer.vue";
import { Check, Trash, Plus } from "lucide-vue-next";
import {
  formTypeEnum,
  sectionTypeEnum,
  type formDataType,
  type sectionType,
} from "@/types/forms";
import { useApiRequest } from "@/composables/common/useApiRequests";
import { formsService } from "@/services/api/forms";
import BaseButton from "@/components/common/BaseComponents/BaseButton.vue";
import { useRouter, useRoute } from "vue-router";
import { useFormsStore } from "@/stores";
const formData = ref<formDataType>({
  form_title: "",
  description: "",
  form_type: formTypeEnum.PRIVATE,
  sections: [],
});

const route = useRoute();
const isEditForm = computed(() => {
  return !!route.params.id;
});

const components = {
  text: defineAsyncComponent(
    () => import("@/components/pages/forms/formItem/sectionTypes/Text.vue")
  ),
  textarea: defineAsyncComponent(
    () => import("@/components/pages/forms/formItem/sectionTypes/Textarea.vue")
  ),
  radio: defineAsyncComponent(
    () => import("@/components/pages/forms/formItem/sectionTypes/Radio.vue")
  ),
  checkbox: defineAsyncComponent(
    () => import("@/components/pages/forms/formItem/sectionTypes/Checkbox.vue")
  ),
  dropdown: defineAsyncComponent(
    () => import("@/components/pages/forms/formItem/sectionTypes/Dropdown.vue")
  ),
  file: defineAsyncComponent(
    () => import("@/components/pages/forms/formItem/sectionTypes/File.vue")
  ),
};

const addSection = () => {
  const newEmptySection: sectionType = {
    id: Math.random().toString(16).slice(2),
    title: "",
    type: sectionTypeEnum.TEXT,
    required: false,
    properties: [],
  };
  formData.value.sections?.push(newEmptySection);
};
const removeSection = (sectionId: string) => {
  formData.value.sections = formData.value.sections?.filter(
    (section) => section.id !== sectionId
  );
};
const copySection = (section: sectionType) => {
  const copiedSection = { ...section, id: Math.random().toString(16).slice(2) };
  formData.value.sections?.push(copiedSection);
};
const moveSection = (to: "up" | "down", index: number) => {
  swapArrayElements(
    formData.value.sections!,
    index,
    to === "up" ? index - 1 : index + 1
  );
};

const swapArrayElements = (array: any[], index1: number, index2: number) => {
  [array[index1], array[index2]] = [array[index2], array[index1]];
};

const {
  sendRequest: addFormRequest,
  error: addFormError,
  isLoading: addFormLoading,
} = useApiRequest();

const {
  sendRequest: updateFormRequest,
  error: updateFormError,
  isLoading: updateFormLoading,
} = useApiRequest();

const router = useRouter();
const formSubmit = async () => {
  const payloadFormData: formDataType = {
    ...formData.value,
    sections: formData.value.sections?.map((section) => {
      const { id, properties, ...others } = section;
      if (properties?.length)
        return {
          ...{ properties: [JSON.stringify(properties)] },
          ...others,
        };
      else return others;
    }),
  };
  if (payloadFormData.created_at) delete payloadFormData.created_at;
  if (isEditForm.value) {
    const params: URLSearchParams = new URLSearchParams();
    params.append("form_id", String(route.params.id));
    await updateFormRequest(
      formsService.updateForm({ formData: payloadFormData, params })
    );
  } else {
    await addFormRequest(formsService.addForm(payloadFormData));
  }
  if (!addFormError.value && !updateFormError.value) {
    router.push({ name: "forms" });
  }
};

const formsStore = useFormsStore();
const forms = computed<formDataType[]>(() => formsStore.forms);
const removeDialog = ref<boolean>(false);
const {
  sendRequest: removeFormRequest,
  error: removeFormError,
  isLoading: removeFormLoading,
} = useApiRequest();
const removeForm = async () => {
  const params: URLSearchParams = new URLSearchParams();
  params.append("form_id", String(route.params.id));
  await removeFormRequest(formsService.removeForm(params));
  if (!removeFormError.value) {
    removeDialog.value = false;
    if (forms.value.length === 1)
      router.push({
        name: "forms",
        query: { lastItemDeleted: "true" },
      });
    else router.push({ name: "forms" });
  }
};

const {
  sendRequest: getSingleFormRequest,
  responseData: singleFormData,
  error: singleFormError,
  isLoading: getSingleFormLoading,
} = useApiRequest();
const fetchSingleForm = async () => {
  const params: URLSearchParams = new URLSearchParams();
  params.append("form_id", String(route.params.id));
  await getSingleFormRequest(formsService.fetchForm(params));
  if (!singleFormError.value) {
    formData.value = singleFormData.value?.data?.data;
    formData.value.sections = formData.value?.sections?.map((section) => {
      return { ...section, id: Math.random().toString(16).slice(2) };
    });
  }
};

onMounted(() => {
  if (isEditForm.value) {
    fetchSingleForm();
  }
});
</script>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
