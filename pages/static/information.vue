<script setup lang="ts">
definePageMeta({
  middleware: "anon", //only auth users can access these pages
  layout: false, //do not show the default layout on this page
});
</script>
<template>
  <NuxtLayout name="auth"></NuxtLayout>
</template>
