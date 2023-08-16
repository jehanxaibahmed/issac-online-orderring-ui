<script setup lang="ts">
import type { Ref } from "vue";
import { useUserStore } from '@/store/user';

const userActionDisableButtons = useUserActionDisableButtons();
const { signInUser } = useAuthComposable();


const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]
const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length >= 4) || "Minimum of 4 Characters",
];



const UserStore = useUserStore();

const { login_screen } = UserStore;

const showCapsLockWarning = ref(false);

function handleCapsLockWarning(event: KeyboardEvent) {
  const hasUserGotCapsLockOn = event.getModifierState("CapsLock");
  if (hasUserGotCapsLockOn) {
    showCapsLockWarning.value = false;
    return;
  }
  showCapsLockWarning.value = true;
}


const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
</script>

<template>
  <VForm @submit.prevent ref="form" v-model="login_screen.valid">
    <h3 class="text-h4 font-weight-bold">Welcome!</h3>
    <p class="text-subtitle-2 text-secondary mt-2 mb-4">
      Please enter your email and password to sign into the application.
    </p>
    <VTextField :rules="emailRules" label="Email Address" v-model="login_screen.email" id="email"
      name="email" variant="outlined" color="primary" bg-color="neutral" autocomplete="username" />

    <VTextField :rules="passwordRules" label="Password" autocomplete="current-password"
      v-model="login_screen.password" id="password" name="password"
      :type="login_screen.showPassword ? 'text' : 'password'"
      :append-inner-icon="login_screen.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @keydown.caps-lock="handleCapsLockWarning"
      @click:append-inner="login_screen.showPassword = !login_screen.showPassword" variant="outlined" bg-color="neutral"
      color="primary" class="elevation-0" />
    <p class="text-warning text-center" v-if="showCapsLockWarning">
      caps lock on!
    </p>

    <VBtn block min-height="44" color="companyPrimary" @click="UserStore.loginUser" :loading="userActionDisableButtons"
      type="submit" variant="tonal" :disabled="!login_screen.valid || userActionDisableButtons">Sign In</VBtn>
    <div class="text-right my-4">
      <NuxtLink to="/auth/forgotten-password" class="font-weight-bold text-primary text-caption">Forgotten your password?
      </NuxtLink>
    </div>
  </VForm>
</template>

<style></style>
