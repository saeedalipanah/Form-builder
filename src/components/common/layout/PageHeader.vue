<template>
  <section class="header w-full flex justify-between items-center bg-background px-3 py-2 rounded-xl">
    <h1 class="font-bold text-xl">{{ title }}</h1>
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
