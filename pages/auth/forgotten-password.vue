<script setup lang="ts">
//@ts-expect-error Lottie File
import forgottenPasswordJSON from "/src/lottie/forgottenPasswordColorHex000000.json";
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const animationTrigger = ref(false);
onMounted(() => {
  animationTrigger.value = true;
});
definePageMeta({
  middleware: "anon",
  layout: false,
});
</script>

<template>
  <NuxtLayout name="auth">
    <VRow align="stretch" justify="center" class="pa-8">
      <VCol
        cols="12"
        sm="6"
        order="first"
        align-self="center"
        class="fill-height">
        <!-- <VRow>
          <VCol>
            <CustomElementsH2
              :headerContent="`${companyEnvBase.companyName} `"
            />

            <h1 class="text-primary text-wrap text-h2 text-md-h1">
              {{ companyEnvBase.appName }}
            </h1>
          </VCol>
        </VRow> -->

        <VRow class="d-flex justify-center">
          <VCard flat color="background" class="pa-2">
            <VCardText>
              <AuthForgottenPassword />
            </VCardText>
          </VCard>
          <!-- 406 right size, messing up alignement though -->
        </VRow>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        xl="6"
        align-self="stretch"
        order="sm-first"
        class="featureBackground">
        <!-- ^ style="max-width: 856px; max-height: 817px" -->
        <!-- <WelcomeAnimationCarousel style="height: 100%" contain /> -->

        <LottieAnimation
          :sourceJSON="forgottenPasswordJSON"
          v-show="animationTrigger"
          width="auto" />
      </VCol>
    </VRow>

    <br />
    <!-- <VTextField style="max-width: 406px"
          prepend-icon="mdi-plus"
          append-icon="mdi-minus"
          @click:append="aaa"
          @click:prepend="aaa" /> -->
    <!-- </VContainer> -->
    <!-- </VApp> -->
  </NuxtLayout>
</template>
