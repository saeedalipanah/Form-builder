<template>
  <div>
    <BaseRadioGroup v-model="selectedRadio" :items="localRadioItems">
      <template #actions="data">
        <CircleX
          class="size-5 text-muted-foreground cursor-pointer"
          @click="removeProperty(localRadioItems, data.itemInfo.i)"
      /></template>
    </BaseRadioGroup>
    <div
      class="flex items-center space-x-2 cursor-pointer text-muted-foreground max-w-max mt-3"
      @click="addNewProperty(localRadioItems)"
    >
      <Circle class="h-3.5 w-3.5 me-2" />
      <label for="add-new" class="cursor-pointer">افزودن گزینه جدید...</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, type PropType } from "vue";
import { Circle, CircleX } from "lucide-vue-next";
import type { propertyType } from "@/types/forms";
import {
  addNewProperty,
  propertiesFormatter,
  removeProperty,
} from "@/composables/pages/forms/useSectionPropertiesHandler";

const props = defineProps({
  properties: {
    type: Array as PropType<propertyType[]>,
    required: true,
  },
});
const emits = defineEmits(["update:properties"]);
const localRadioItems = computed<propertyType[]>({
  get() {
    return props.properties;
  },
  set(newValue) {
    emits("update:properties", newValue);
  },
});

const selectedRadio = ref<string>("");

onMounted(() => {
  if (props.properties?.length) {
    localRadioItems.value = propertiesFormatter(props.properties);
  }
});
</script>
