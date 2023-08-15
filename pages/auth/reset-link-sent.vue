<script setup lang="ts">
//@ts-expect-error Lottie File
import sendResetPasswordJSON from "/src/lottie/resetPasswordColorHex000000.json";
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
          <VCard flat color="background" class="pa-2">
            <VCardText>
              <p class="text-h4 font-weight-bold text-center">Password Reset</p>
              <VRow align="stretch" justify="center" class="pt-3">
                <VCol lg="6" md="6" sm="7" cols="8">
                  <p class="text-center text-caption">
                    We have just sent you an email to rest your password, press
                    the button on the email and this will take you to the page
                    where you can create a new password.
                  </p>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
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
          order="sm-first"
          class="featureBackground">
          <!-- ^ style="max-width: 856px; max-height: 817px" -->
          <!-- <WelcomeAnimationCarousel style="height: 100%" contain /> -->

          <LottieAnimation
            :sourceJSON="sendResetPasswordJSON"
            v-show="animationTrigger"
            width="auto" />
        </VCol>
      </VRow>
    </VRow>
  </NuxtLayout>
</template>
<style lang="sass">
.featureBackground
  background: rgb(var(--v-theme-surface))
  border-radius: 2em
</style>
