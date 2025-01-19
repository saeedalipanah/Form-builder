<template>
  <div class="basic-form-information">
    <section class="grid grid-cols-1 md:grid-cols-12 gap-3">
      <BaseInput
        v-model="localFormTitle"
        class="md:col-span-4"
        label="نام فرم"
        placeholder="یک عنوان برای این فرم"
      />
      <BaseSelect
        v-model="localFormType"
        :items="items"
        :disabled="isEditForm"
        class="md:col-span-3 mb-5"
        label="دسته‌بندی"
        placeholder="انتخاب دسته‌بندی"
      />
    </section>
    <section class="grid grid-cols-1 md:grid-cols-12 gap-3">
      <BaseTextarea
        v-model="Description"
        class="md:col-span-4"
        rows="6"
        label="توضیحات فرم"
        placeholder="توضیحات در مورد این فرم"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
import { formTypeEnum } from "@/types/forms";
import { computed, type PropType } from "vue";
const props = defineProps({
  form_title: {
    type: String,
    required: true,
  },
  form_type: {
    type: String as PropType<formTypeEnum>,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isEditForm: { type: Boolean, default: false },
});

const emits = defineEmits([
  "update:form_title",
  "update:form_type",
  "update:description",
]);
const localFormTitle = computed<string>({
  get() {
    return props.form_title;
  },
  set(newValue) {
    emits("update:form_title", newValue);
  },
});
const localFormType = computed<formTypeEnum>({
  get() {
    return props.form_type;
  },
  set(newValue) {
    emits("update:form_type", newValue);
  },
});
const Description = computed<string>({
  get() {
    return props.description;
  },
  set(newValue) {
    emits("update:description", newValue);
  },
});

const items = [
  { value: formTypeEnum.PUBLIC, label: "عمومی" },
  { value: formTypeEnum.PRIVATE, label: "خصوصی" },
];
</script>
