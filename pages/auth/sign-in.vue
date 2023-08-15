<script setup lang="ts">
import { useDisplay } from "vuetify";
//@ts-expect-error Lottie File
import securityJSON from "/src/lottie/securityCustColorHex000000.json";
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const { height, width, xs, lgAndUp } = useDisplay();
definePageMeta({
  middleware: "anon",
  layout: false,
});
const animationTrigger = ref(false);
onMounted(() => {
  animationTrigger.value = true;
});
</script>

<template>
  <NuxtLayout name="auth">
    <VRow justify="center" class="fill-height">
      <VSlideYReverseTransition>
        <!-- <VFabTransition> -->
        <VCol cols="12" lg="8" v-show="animationTrigger">
          <!-- <CustomElementsH1 headerContent="Welcome Back, 👋" /> -->
          <CustomElementsH1 headerContent="Welcome Back" />
          <CustomElementsH3 headerContent="Please enter your credentials" />
          <AuthSignInForm />
          <!-- https://nuxt.com/docs/guide/directory-structure/components#component-names -->
        </VCol>
      </VSlideYReverseTransition>
      <VCol cols="12" lg="4" v-if="lgAndUp">
        <VSlideXTransition>
          <LottieAnimation
            :sourceJSON="securityJSON"
            v-show="animationTrigger" />
        </VSlideXTransition>
      </VCol>
    </VRow>
  </NuxtLayout>
</template>
