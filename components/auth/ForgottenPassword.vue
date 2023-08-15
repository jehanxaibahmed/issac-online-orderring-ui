<script setup lang="ts">
import type { Ref } from "vue";
const { emailForgottenPasswordLinkUser } = useAuthComposable();
const userActionDisableButtons = useUserActionDisableButtons();
const valid: Ref<boolean> = ref(true);
const email: Ref<string> = ref("");
const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
const router = useRouter();
</script>

<template>
  <!-- <VCard> -->
  <VForm ref="form" v-model="valid">
    <h3 class="text-h4 font-weight-bold">Forgotten Your Password?</h3>
    <p class="text-subtitle-2 text-secondary mt-2 mb-4">
      Please can you enter your email and we will send you a reset link
    </p>
    <VTextField
      :rules="emailRules"
      label="Email Address"
      v-model="email"
      id="email"
      name="email"
      type="email"
      variant="outlined"
      color="primary"
      bg-color="neutral"
      autocomplete="username" />

    <VCardActions>
      <VBtn
        color="primary"
        variant="text"
        @click="router.push({ path: '/' })"
        :loading="userActionDisableButtons"
        :disabled="userActionDisableButtons"
        >Back</VBtn
      >
      <VSpacer />
      <VBtn
        variant="tonal"
        color="primary"
        type="tonal"
        @click="emailForgottenPasswordLinkUser(email)"
        :loading="userActionDisableButtons"
        :disabled="!valid || userActionDisableButtons"
        >Submit</VBtn
      >
    </VCardActions>
  </VForm>
  <!-- </VCard> -->
</template>
