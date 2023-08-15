<script setup lang="ts">
//Same component for both anon and authenticated users as the only difference between them should be the layout
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const router = useRouter();
const userActionDisableButtons = useUserActionDisableButtons();
const animationTrigger = ref(false);
const props = defineProps({
  responseCode: String,
  messageToUser: String,
  typeOfModeTitleText: String,
  lottieType: Object,
  showHomeButton: Boolean,
});

onMounted(() => {
  animationTrigger.value = true;
});
</script>
<template>
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
            <p
              id="typeOfModeText"
              :class="['text-h4', 'text-sm-h5', , 'font-weight-bold']">
              {{ typeOfModeTitleText }}
            </p>
            <p
              :class="[
                'text-h4',
                'text-sm-h5',
                'font-weight-bold',
                'text-primary',
              ]"
              id="responseCode">
              {{ responseCode }}
            </p>

            <p
              id="messageToUser"
              :class="[
                'text-xl-h6',
                'text-lg-h6',
                'text-md-subtitle-2',
                'text-sm-caption',
              ]">
              {{ messageToUser }}
            </p>
          </VCardText>
          <VRow align="stretch" justify="center" v-if="showHomeButton">
            <VCol cols="12">
              <VBtn
                block
                min-height="2"
                color="primary"
                @click="router.push({ path: '/' })"
                :loading="userActionDisableButtons"
                :disabled="userActionDisableButtons"
                >Return Home</VBtn
              >
            </VCol>
          </VRow>
        </VCard>
        <!-- 406 right size, messing up alignement though -->
      </VRow>
    </VCol>

    <VCol
      cols="12"
      sm="7"
      md="6"
      lg="5"
      xl="4"
      align-self="stretch"
      order="sm-first"
      class="featureBackground">
      <!-- ^ style="max-width: 856px; max-height: 817px" -->
      <!-- <WelcomeAnimationCarousel style="height: 100%" contain /> -->

      <LottieAnimation
        :sourceJSON="lottieType"
        v-show="animationTrigger"
        width="auto" />
    </VCol>
  </VRow>

  <br />
</template>

<style lang="sass">

.featureBackground
  background: rgb(var(--v-theme-neutral))
  border-radius: 2em
</style>
