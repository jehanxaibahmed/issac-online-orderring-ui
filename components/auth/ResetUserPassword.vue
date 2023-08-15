<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
const userActionDisableButtons = useUserActionDisableButtons();
const { resetForgottenPassword } = useAuthComposable();
const valid: Ref<boolean> = ref(true);
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const confirmPassword: Ref<string> = ref("");
const showPassword: Ref<boolean> = ref(false);
const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length >= 4) || "Minimum of 4 Characters",
];
const confirmPasswordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length >= 4) || "Minimum of 4 Characters",
  (v: string) => v === password.value || "Passwords must match",
];
const route = useRoute();
const routeToken = <string>route.query.token;
const showCapsLockWarning = ref(false);

function handleCapsLockWarning(event: KeyboardEvent) {
  const hasUserGotCapsLockOn = event.getModifierState("CapsLock");
  if (hasUserGotCapsLockOn) {
    showCapsLockWarning.value = false;
    return;
  }
  showCapsLockWarning.value = true;
}
</script>

<template>
  <VForm ref="form" v-model="valid">
    <h3 class="text-h4 font-weight-bold">Password Reset</h3>
    <p class="text-subtitle-2 text-secondary mt-2 mb-4">
      Please enter your email and your new password so you can sign in
    </p>
    <VTextField
      :rules="emailRules"
      label="Email Address"
      v-model="email"
      id="email"
      name="email"
      variant="outlined"
      color="primary"
      bg-color="neutral"
      autocomplete="username" />

    <VTextField
      :rules="passwordRules"
      label="Password"
      v-model="password"
      id="password"
      name="password"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @keydown.caps-lock="handleCapsLockWarning"
      @click:append-inner="showPassword = !showPassword"
      variant="outlined"
      bg-color="neutral"
      color="primary"
      class="elevation-0" />
    <p class="text-warning text-center" v-if="showCapsLockWarning">
      caps lock on!
    </p>

    <VTextField
      :rules="confirmPasswordRules"
      label="Confirm Password"
      v-model="confirmPassword"
      id="confirmPassword"
      name="confirmPassword"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @keydown.caps-lock="handleCapsLockWarning"
      @click:append-inner="showPassword = !showPassword"
      variant="outlined"
      bg-color="neutral"
      color="primary"
      class="elevation-0" />
    <p class="text-warning text-center" v-if="showCapsLockWarning">
      caps lock on!
    </p>

    <VBtn
      block
      min-height="44"
      color="primary"
      variant="tonal"
      @click="
        resetForgottenPassword(password, confirmPassword, email, routeToken)
      "
      :loading="userActionDisableButtons"
      type="submit"
      :disabled="!valid || userActionDisableButtons"
      >Reset Password</VBtn
    >
  </VForm>
</template>

<style></style>
