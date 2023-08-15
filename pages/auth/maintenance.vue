<script setup lang="ts">
//@ts-expect-error Lottie File
import maintenanceJSON from "/src/lottie/3maintenanceColorHex000000.json";

definePageMeta({
  layout: false,
  middleware: "auth",
});
</script>

<template>
  <VApp>
    <VContainer>
      <DisplayErrorMessagePageTextActionsAndLottie
        responseCode="503"
        typeOfModeTitleText="Maintenance Mode"
        messageToUser="We are undergoing maintenance we will be back shortly."
        :lottieType="maintenanceJSON" />
      <VBtn>return home</VBtn>
    </VContainer>
  </VApp>
</template>

<style></style>
