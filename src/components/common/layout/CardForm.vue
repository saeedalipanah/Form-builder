<template>
  <BaseCard>
    <template #card-header>
      <div
        class="form-name bg-muted h-32 rounded-md flex justify-center items-center px-1"
      >
        <h3 class="font-bold text-xl text-center">{{ title }}</h3>
      </div>
    </template>
    <template #card-content>
      <p class="form-date text-xs my-3 text-muted-foreground">
        {{ customPersianDateFormat }}
      </p>
    </template>
    <template #card-footer>
      <BaseButton
        class="w-full"
        variant="outline"
        @click="() => $router.push({ name: 'formDetails', params: { id } })"
      >
        <Eye />
        مشاهده فرم
      </BaseButton>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Eye } from "lucide-vue-next";
import { timeStampToPersianDate } from "@/composables/common/useDateConverter";

const props = defineProps({
  id: { type: String },
  title: { type: String },
  date: { type: Number },
});
const customPersianDateFormat = computed(() =>
  props?.date ? timeStampToPersianDate(props.date, "jD jMMMM jYYYY") : ""
);
</script>
