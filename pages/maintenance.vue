<script setup lang="ts">
//@ts-expect-error Lottie File
import maintenanceJSON from "/src/lottie/3maintenanceColorHex000000.json";

const runtimeConfig = useRuntimeConfig();

definePageMeta({
  middleware: "anon", //only auth users can access these pages
  layout: false,
});
</script>

<template>
  <NuxtLayout name="auth">
    <DisplayErrorMessagePageTextActionsAndLottie
      responseCode="503"
      typeOfModeTitleText="Maintenance Mode"
      messageToUser="We are undergoing maintenance we will be back shortly."
      :lottieType="maintenanceJSON" />
  </NuxtLayout>
</template>

<style></style>
