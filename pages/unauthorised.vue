<script setup lang="ts">
//@ts-expect-error Lottie File
import unauthorisedJSON from "/src/lottie/2unauthorisedColorHex000000.json";

definePageMeta({
  middleware: "anon",
  layout: false,
});
//this is the auth unauthorised page, we want this to have the same layout as for all other auth user pages
</script>

<template>
  <NuxtLayout name="auth">
    <DisplayErrorMessagePageTextActionsAndLottie
      responseCode="401"
      typeOfModeTitleText="Unauthorized"
      messageToUser="
      You are not allowed access to this page."
      :lottieType="unauthorisedJSON"
      :showHomeButton="true" />
  </NuxtLayout>
</template>

<style></style>
