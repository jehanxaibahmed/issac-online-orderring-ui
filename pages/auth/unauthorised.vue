<script setup lang="ts">
//@ts-expect-error Lottie File
import unauthorisedJSON from "/src/lottie/2unauthorisedColorHex000000.json";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <DisplayErrorMessagePageTextActionsAndLottie
    responseCode="401"
    typeOfModeTitleText="Unauthorized"
    messageToUser="You are not allowed access to this page."
    :lottieType="unauthorisedJSON"
    :showHomeButton="true" />
</template>

<style></style>
