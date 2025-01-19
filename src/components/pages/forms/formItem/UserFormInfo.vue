<template>
  <div class="user-form-information">
    <section class="grid grid-cols-1 md:grid-cols-12 gap-3">
      <BaseInput
        class="md:col-span-4"
        label="نام خانوادگی"
        placeholder="پاسخ شما"
      />
      <BaseInput
        class="md:col-span-4"
        label="نام"
        placeholder="پاسخ شما"
      />
    </section>
    <section class="grid grid-cols-1 md:grid-cols-12 gap-3">
      <BaseInput
        class="md:col-span-4"
        label="ایمیل"
        placeholder="پاسخ شما"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";


</script>
