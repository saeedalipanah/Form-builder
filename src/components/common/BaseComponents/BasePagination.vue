<template>
  <div class="flex justify-between w-full text-muted-foreground">
    <BaseButton
      :disabled="prevIsDisabled"
      variant="outline"
      size="icon"
      @click="prev"
    >
      <ChevronRight class="w-4 h-4" />
    </BaseButton>
    <div class="flex items-center mx-2 gap-x-2 text-muted-foreground">
      <BaseInput
        v-model="currentPage"
        :min="1"
        :max="lastPage"
        type="number"
        class="w-10"
        exact-input-class="text-md"
        @update:model-value="updatePagination"
      ></BaseInput>
      <span class="mb-4">از</span>
      <span class="mb-4">{{ lastPage }}</span>
    </div>

    <BaseButton
      :disabled="nextIsDisabled"
      variant="outline"
      size="icon"
      @click="next"
    >
      <ChevronLeft class="w-4 h-4" />
    </BaseButton>
  </div>
</template>
<script setup lang="ts">
import { ChevronRight, ChevronLeft } from "lucide-vue-next";
import { computed, ref } from "vue";

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  perPage: {
    type: [String, Number],
    default: 6,
  },
});
const emits = defineEmits(["update:page"]);
const currentPage = ref(+props.page);
const lastPage = computed<number>(() =>
  Math.ceil(+props.total / +props.perPage)
);

const prevIsDisabled = computed<boolean>(() => currentPage.value <= 1);
const nextIsDisabled = computed<boolean>(
  () => currentPage.value >= lastPage.value
);

const next = () => {
  currentPage.value < 1 || nextIsDisabled.value
    ? (currentPage.value = props.page + 1)
    : currentPage.value++;

  if (currentPage.value > lastPage.value) currentPage.value = lastPage.value;
  emits("update:page", currentPage.value);
};
const prev = () => {
  prevIsDisabled.value || currentPage.value > lastPage.value
    ? (currentPage.value = props.page - 1)
    : currentPage.value--;

  if (currentPage.value < 1) currentPage.value = 1;
  emits("update:page", currentPage.value);
};

const updatePagination = () => {
  if (currentPage.value >= 1 && currentPage.value <= lastPage.value)
    emits("update:page", currentPage.value);
};
</script>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
