<template>
  <div class="form-item-container">
    <section class="form-item-properties grid grid-cols-12 gap-3 mb-3">
      <BaseInput
        v-model="localTitle"
        placeholder="عنوان پرسش"
        class="col-span-12 sm:col-span-8 lg:col-span-4"
      />
      <BaseSelect
        v-model="localType"
        :items="allFormTypes"
        placeholder="نوع پرسش"
        class="col-span-12 sm:col-span-4 lg:col-span-2"
      />
      <div
        class="required-answer col-span-6 lg:col-span-2 lg:col-start-8 flex justify-center"
      >
        <div
          class="border border-muted rounded-xl w-full h-10 flex justify-center items-center"
        >
          <BaseSwitch v-model="localRequired" label="پاسخ الزامی" />
        </div>
      </div>
      <div
        class="controller-buttons col-span-6 lg:col-span-3 flex justify-center"
      >
        <BaseButton
          class="w-10 hover:bg-muted"
          variant="icon"
          @click="emits('on-copy-section')"
        >
          <Copy />
        </BaseButton>
        <BaseButton
          class="w-10 hover:bg-muted"
          variant="icon"
          @click="emits('on-remove-section')"
        >
          <Trash />
        </BaseButton>
        <BaseButton
          :disabled="moveUpDisabled"
          class="w-10 hover:bg-muted"
          variant="icon"
          @click="emits('on-move-up')"
        >
          <ArrowUp />
        </BaseButton>
        <BaseButton
          :disabled="moveDownDisabled"
          class="w-10 hover:bg-muted"
          variant="icon"
          @click="emits('on-move-down')"
        >
          <ArrowDown />
        </BaseButton>
      </div>
    </section>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { sectionTypeEnum } from "@/types/forms";
import { Copy, Trash, ArrowUp, ArrowDown } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  moveUpDisabled: {
    type: Boolean,
    default: false,
  },
  moveDownDisabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  "update:title",
  "update:type",
  "update:required",
  "on-remove-section",
  "on-copy-section",
  "on-move-up",
  "on-move-down",
]);
const localTitle = computed({
  get() {
    return props.title;
  },
  set(newValue) {
    emits("update:title", newValue);
  },
});
const localType = computed({
  get() {
    return props.type;
  },
  set(newValue) {
    emits("update:type", newValue);
  },
});
const localRequired = computed({
  get() {
    return props.required;
  },
  set(newValue) {
    emits("update:required", newValue);
  },
});

const allFormTypes = [
  { value: sectionTypeEnum.TEXT, label: "پاسخ کوتاه" },
  { value: sectionTypeEnum.TEXTAREA, label: "پاسخ بلند" },
  { value: sectionTypeEnum.RADIO, label: "تک پاسخی" },
  { value: sectionTypeEnum.CHECKBOX, label: "چندین پاسخی" },
  { value: sectionTypeEnum.DROPDOWN, label: "لیست انتخابی" },
  { value: sectionTypeEnum.FILE, label: "بارگذاری پیوست" },
];
</script>
