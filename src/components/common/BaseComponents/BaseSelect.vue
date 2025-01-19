<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="text-xs">{{ label }}</label>
    <Select v-model="localValue" :disabled>
      <SelectTrigger>
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="(item, i) in items"
            :key="item.value + i"
            :value="item.value"
          >
            {{ item.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { computed, type PropType } from "vue";
const props = defineProps({
  modelValue: { type: String, required: true },
  items: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
  },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  id: {
    type: String,
    default: "input",
  },
  error: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:model-value"]);

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:model-value", newValue);
  },
});
</script>
