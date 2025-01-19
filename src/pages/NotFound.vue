<template>
  <div class="h-[95vh] flex flex-col justify-center items-center">
    <h1 class="font-bold text-2xl">۴۰۴ - صفحه پیدا نشد</h1>
    <p class="mt-3 text-muted-foreground">
      متاسفانه صفحه‌ای که به دنبال آن بودید، وجود ندارد.
    </p>

    <Router-link :to="{ name: 'forms' }" class="mt-8 text-blue-500 underline"
      >بازگشت به خانه</Router-link
    >
  </div>
</template>
<script setup lang="ts"></script>
