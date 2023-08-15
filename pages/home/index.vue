<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { useSnackbarStore } from '@/store/snackbar';


function openSnackbar() {
  const snackBarStore = useSnackbarStore();
  snackBarStore.displaySnackbar(
          "Signed In Successfully",
          "",
          "info",
          5000,
          "mdi-login-variant",
          false,
          false
        );
}

</script>
<template>
  <VRow justify="center">
    <VCol sm="12" xl="12" cols="12" class="mb-6">
      <AccountHeader class="my-10" />
      <HomepageCompanyCardDesign />
      <UtilzBreadCrumbs  />
      <v-btn  @click="openSnackbar"> Open Snackbar </v-btn>

    </VCol>
  </VRow>
  
</template>
