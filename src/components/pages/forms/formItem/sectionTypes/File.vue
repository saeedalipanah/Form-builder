<template>
  <BaseFileInput class="w-full h-32" @on-choose-file="setSelectedFile" />
</template>
<script setup lang="ts">
import { ref } from "vue";

const selectedFile = ref<HTMLInputElement | null>(null);
const setSelectedFile = (file: HTMLInputElement) => {
  selectedFile.value = file;
};
</script>
