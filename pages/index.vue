<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const env = runtimeConfig.public;
const animationTrigger = ref(false);

onMounted(() => {
  animationTrigger.value = true;
});

definePageMeta({
  middleware: "anon", //only auth users can access these pages
  layout: false,
});

//@ts-expect-error Lottie File
import onlineCheckoutJSON from "/src/lottie/onlineCheckoutCustColorHex000000.json";
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
        <VRow class="d-flex justify-center">
          <VCard flat color="background" class="pa-2">
            <VCardText>
              <AuthSignInForm />
            </VCardText>
          </VCard>
        </VRow>
      </VCol>

      <VCol
        cols="12"
        sm="6"
        align-self="stretch"
        order="sm-first"
        class="featureBackground">
        <LottieAnimation
          :sourceJSON="onlineCheckoutJSON"
          v-show="animationTrigger"
          width="auto" />
      </VCol>
    </VRow>

    <br />
  </NuxtLayout>
</template>

