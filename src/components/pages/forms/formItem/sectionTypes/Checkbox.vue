<template>
  <div>
    <ul>
      <li
        v-for="(checkbox, i) in localCheckboxes"
        :key="checkbox.value + i"
        class="mb-2"
      >
        <div class="flex">
          <BaseCheckbox v-model="checkbox.value" :label="checkbox.label" />
          <CircleX
            class="size-5 text-muted-foreground cursor-pointer"
            @click="removeProperty(localCheckboxes, i)"
          />
        </div>
      </li>
    </ul>
    <div
      class="flex items-center space-x-2 cursor-pointer text-muted-foreground max-w-max mt-3"
      @click="addNewProperty(localCheckboxes, 'boolean')"
    >
      <Square class="h-4 w-4 me-2 rounded-3xl" />
      <label for="add-new" class="cursor-pointer">افزودن گزینه جدید...</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, type PropType } from "vue";
import { CircleX, Square } from "lucide-vue-next";
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
const localCheckboxes = computed<propertyType[]>({
  get() {
    return props.properties;
  },
  set(newValue) {
    emits("update:properties", newValue);
  },
});

onMounted(() => {
  if (props.properties?.length) {
    localCheckboxes.value = propertiesFormatter(props.properties, "boolean");
  }
});
</script>
