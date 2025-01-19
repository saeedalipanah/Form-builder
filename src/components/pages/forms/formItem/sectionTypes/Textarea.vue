<template>
  <BaseTextarea
    v-model="localValue"
    placeholder="پاسخ شما"
    rows="6"
    exact-textarea-class="bg-muted"
  />
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:model-value"]);
const localValue = computed<string>({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emits("update:model-value", newValue);
  },
});
</script>
