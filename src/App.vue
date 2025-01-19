<template>
  <main>
    <Toaster />
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import {  RouterView } from "vue-router";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>
