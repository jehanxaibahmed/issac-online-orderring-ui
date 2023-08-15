<script setup lang="ts">
import { useDisplay } from "vuetify";
//@ts-expect-error Lottie File
import sendResetPasswordJSON from "/src/lottie/newPasswordColorHex000000.json";
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const animationTrigger = ref(false);
onMounted(() => {
  animationTrigger.value = true;
});

definePageMeta({
  middleware: "anon", //only auth users can access these pages
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
        <VRow class="d-flex justify-center">
          <VCard flat color="background" class="pa-2">
            <VCardText>
              <AuthResetUserPassword />
            </VCardText>
          </VCard>
          <!-- 406 right size, messing up alignement though -->
        </VRow>
      </VCol>

      <VCol
        cols="12"
        xl="5"
        lg="5"
        md="6"
        sm="6"
        align-self="stretch"
        order="sm-first"
        class="featureBackground">
        <!-- ^ style="max-width: 856px; max-height: 817px" -->
        <!-- <WelcomeAnimationCarousel style="height: 100%" contain /> -->
        <!-- the lottie is too big or too wide this is -->

        <LottieAnimation
          :sourceJSON="sendResetPasswordJSON"
          v-show="animationTrigger"
          width="570px" />
      </VCol>
    </VRow>
  </NuxtLayout>
</template>

<style lang="sass">
.featureBackground
  background: rgb(var(--v-theme-surface))
  border-radius: 2em

// .lottieSize {
//   max-width: 570.33px;
//   max-height:676px;
// }
</style>
