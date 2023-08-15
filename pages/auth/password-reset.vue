<script setup lang="ts">
//@ts-expect-error Lottie File
import hasResetPasswordJSON from "/src/lottie/hasResetPasswordColorHex000000.json";
const router = useRouter();
const userActionDisableButtons = useUserActionDisableButtons();
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
              <p class="text-h4 font-weight-bold text-center">
                Your Password Has Been Reset
              </p>
              <VRow align="stretch" justify="center" class="pt-3">
                <VCol lg="6" md="6" sm="7" cols="8">
                  <p class="text-center text-caption">
                    Your account password has just been successfully updated,
                    press the 'RETURN HOME' button to log back into your
                    account.
                  </p>
                  <VRow align="stretch" justify="center" class="pt-3">
                    <VCol lg="6" md="6" sm="5" cols="8">
                      <VBtn
                        variant="text"
                        min-height="2"
                        color="primary"
                        @click="router.push({ path: '/' })"
                        :loading="userActionDisableButtons"
                        :disabled="userActionDisableButtons"
                        >Return Home</VBtn
                      >
                    </VCol>
                  </VRow>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <!-- 406 right size, messing up alignement though -->
        </VRow>
      </VCol>

      <VRow align="stretch" justify="center">
        <VCol
          cols="7"
          lg="2"
          md="3"
          xl="3"
          sm="5"
          align-self="stretch"
          order="sm-first"
          class="featureBackground">
          <LottieAnimation
            :sourceJSON="hasResetPasswordJSON"
            v-show="animationTrigger"
            width="auto" />
        </VCol>
      </VRow>
    </VRow>
  </NuxtLayout>
</template>
