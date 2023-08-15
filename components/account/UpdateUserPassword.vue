<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
const userActionDisableButtons = useUserActionDisableButtons();
const { updateUserPassword } = useAuthComposable();
const router = useRouter();
// const valid = ref(true);
const showEditpasswordInput = ref(false);
const ispasswordEditable = ref(true);

function toggleShowEditPasswordInput() {
  showEditpasswordInput.value = !showEditpasswordInput.value;
}

const user = reactive({
  valid: true,
  password: "",
  confirmPassword: "",
  showPassword: false,
});

async function handleSubmitOnSave() {
  await updateUserPassword(user.password, user.confirmPassword);

  ispasswordEditable.value = !ispasswordEditable.value;
  showEditpasswordInput.value = !showEditpasswordInput.value;
}

function handleCancelPasswordInput() {
  ispasswordEditable.value = !ispasswordEditable.value;
  showEditpasswordInput.value = !showEditpasswordInput.value;
  // location.reload();
  // return router.push({ path: "/other/account" });
}

const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length >= 4) || "Minimum of 4 Characters",
];
const confirmPasswordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => (v && v.length >= 4) || "Minimum of 4 Characters",
  (v: string) => v === user.password || "Passwords must match",
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
  <VForm ref="form" v-model="user.valid">
    <!-- <VCard flat class="bg-background pa-3"> -->

    <VRow v-if="!showEditpasswordInput" no-gutters>
      <VCol sm="3" cols="4">
        <VCardText class="px-0">
          <p class="font-weight-bold text-subtitle-2">
            Password:
            <!-- {{ user.password }} -->
          </p>
        </VCardText>
      </VCol>

      <VCol sm="6" cols="4">
        <VCardText class="text-subtitle-2 text-medium-emphasis px-0">
          ***********
          <!-- {{ user.password }} -->
        </VCardText>
      </VCol>

      <VCol sm="3" cols="4">
        <VHover v-slot="{ isHovering, props }">
          <VBtn
            @click="toggleShowEditPasswordInput"
            rounded="xl"
            size="default"
            min-height="22"
            v-bind="props"
            :class="isHovering ? 'bg-error' : 'bg-primary'"
            class="bg-primary ml-8 px-0 mt-2"
            type="submit"
            variant="text"
            >Edit</VBtn
          >
        </VHover>
      </VCol>
    </VRow>

    <VRow v-if="showEditpasswordInput" justify="center">
      <VCol sm="3" lg="2" cols="12">
        <VCardText class="font-weight-bold text-subtitle-2 px-0">
          Password:
        </VCardText>
      </VCol>

      <VCol sm="9" lg="6" cols="12">
        <VCardText>
          <VTextField
            :rules="passwordRules"
            class="CompanySpecificAccountInputVField"
            v-model="user.password"
            prepend-inner-icon="mdi-lock"
            id="password"
            name="password"
            :type="user.showPassword ? 'text' : 'password'"
            :append-inner-icon="user.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="user.showPassword = !user.showPassword"
            variant="outlined"
            density="comfortable"
            color="error"
            @keydown.caps-lock="handleCapsLockWarning"
            label="New Password" />
        </VCardText>

        <VCardText class="py-0">
          <VTextField
            :rules="confirmPasswordRules"
            class="CompanySpecificAccountInputVField px-0"
            v-model="user.confirmPassword"
            prepend-inner-icon="mdi-lock"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            :type="user.showPassword ? 'text' : 'password'"
            :append-inner-icon="user.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="user.showPassword = !user.showPassword"
            variant="outlined"
            density="comfortable"
            color="error"
            @keydown.caps-lock="handleCapsLockWarning" />
          <p class="text-warning text-center" v-if="showCapsLockWarning">
            caps lock on!
          </p>
        </VCardText>
      </VCol>

      <VSpacer />
      <VCol sm="1" lg="4" cols="12">
        <VCardActions class="">
          <VHover v-slot="{ isHovering, props }">
            <VBtn
              rounded="xl"
              min-height="44"
              v-bind="props"
              :class="isHovering ? 'bg-error' : 'bg-primary'"
              @click="handleSubmitOnSave()"
              :loading="userActionDisableButtons"
              type="submit"
              variant="text">
              Save</VBtn
            ></VHover
          >
          <VHover v-slot="{ isHovering, props }">
            <VBtn
              rounded="xl"
              min-height="44"
              class="bg-error"
              @click="handleCancelPasswordInput"
              :loading="userActionDisableButtons"
              type="submit"
              variant="outlined">
              Cancel</VBtn
            ></VHover
          >
        </VCardActions>
      </VCol>
    </VRow>
    <!-- </VCard> -->
  </VForm>
</template>

<style>
/* .v-field--variant-plain.v-field {
  --v-field-padding-top: --20px;
  --v-field-padding-bottom: 0px;
  --v-field-padding-start: 20px;
}

.CompanySpecificAccountInputVField {
  border: 1px solid;
  border-radius: 15px;
  height: 40px;
} */
</style>
