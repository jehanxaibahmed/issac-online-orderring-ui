<script setup lang="ts">
//@ts-expect-error Lottie File
import pageNotFoundJSON from "/src/lottie/pageNotFoundColorHex000000.json";
const userActionDisableButtons = useUserActionDisableButtons();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });

definePageMeta({
  middleware: "anon", //only auth users can access these pages
});
const { userData } = useAuthComposable();
//https://stackoverflow.com/questions/60284864/nuxt-js-static-site-and-404-page answer here https://stackoverflow.com/a/75858303
</script>

<template>
  <NuxtLayout :name="userData ? 'default' : 'auth'">
    <DisplayErrorMessagePageTextActionsAndLottie
      responseCode="404"
      typeOfModeTitleText="Page Not Found"
      messageToUser="The page you are looking for does not exist."
      :lottieType="pageNotFoundJSON"
      :showHomeButton="true" />
  </NuxtLayout>
</template>

<style></style>
