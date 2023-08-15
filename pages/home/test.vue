<script setup lang="ts">
definePageMeta({
//   middleware: "auth",
});




</script>
<template>
  <VRow justify="center">
    <VCol sm="12" xl="12" cols="12" class="mb-6">
      <AccountHeader class="my-10" />
      <HomepageCompanyCardDesign />
      <UtilzBreadCrumbs  />
      <v-btn > Open Snackbar </v-btn>

    </VCol>
  </VRow>
  
</template>
