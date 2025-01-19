<template>
  <div>
    <ul>
      <li
        v-for="(checkbox, i) in localDropDownItems"
        :key="checkbox.value + i"
        class="mb-2"
      >
        <div class="flex">
          <span class="me-1">{{ i + 1 }}-</span
          ><label class="me-2">{{ checkbox.label }}</label>
          <CircleX
            class="size-5 text-muted-foreground cursor-pointer"
            @click="removeProperty(localDropDownItems, i)"
          />
        </div>
      </li>
    </ul>
    <div
      class="flex items-center space-x-2 cursor-pointer text-muted-foreground max-w-max mt-3"
      @click="addNewProperty(localDropDownItems)"
    >
      <span class="me-1">{{ localDropDownItems.length + 1 }}-</span>
      <label for="add-new" class="cursor-pointer">افزودن گزینه جدید...</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, type PropType } from "vue";
import { CircleX } from "lucide-vue-next";
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
const localDropDownItems = computed<propertyType[]>({
  get() {
    return props.properties;
  },
  set(newValue) {
    emits("update:properties", newValue);
  },
});

onMounted(() => {
  if (props.properties?.length) {
    localDropDownItems.value = propertiesFormatter(props.properties);
  }
});
</script>
