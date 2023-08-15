<script setup lang="ts">
//@ts-expect-error Lottie File
import loadingJSON from "/src/lottie/loadingColorHex000000.json";
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public; //env variables
const displayLoadTimeout = ref(false);
// this will display the loading element for 250 milliseconds
</script>

<template>
  <!-- after the timeout the page elements should load  -->
  <VRow align="stretch" justify="start" class="pa-8">
    <VCol
      cols="12"
      lg="12"
      md="12"
      sm="12"
      order="first"
      align-self="center"
      class="fill-height">
      <VRow class="d-flex justify-center">
        <p class="text-h4 font-weight-bold text-center mb-5">
          {{ companyEnvBase.appName }}
          connection has failed
        </p>
        <!-- 406 right size, messing up alignement though -->
      </VRow>
    </VCol>
    <VRow align="stretch" justify="center" class="">
      <VCol
        cols="8"
        lg="3"
        md="4"
        xl="3"
        sm="5"
        align-self="stretch"
        order="sm-first">
        <!-- ^ style="max-width: 856px; max-height: 817px" -->
        <!-- <WelcomeAnimationCarousel style="height: 100%" contain /> -->

        <LottieAnimation :sourceJSON="loadingJSON" width="auto" />
      </VCol>
    </VRow>
  </VRow>
</template>
