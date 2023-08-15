<script setup lang="ts">
import { ref } from "vue";
import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
const { userData } = useAuthComposable();
const userActionDisableButtons = useUserActionDisableButtons();
const { updateUser } = useAuthComposable();
const theme = useTheme();

const showEditUsernameInput = ref(false);
const isUsernameEditable = ref(true);

const props = defineProps({
  usernameProp: {
    type: String,
    required: true,
  },
});

// const valid = ref(true);

function toggleShowEditUsernameInput() {
  showEditUsernameInput.value = !showEditUsernameInput.value;
}

const username = ref(props.usernameProp);

async function handleSubmitOnSave() {
  await updateUser(username.value);

  isUsernameEditable.value = !isUsernameEditable.value;
  showEditUsernameInput.value = !showEditUsernameInput.value;
}

function handleCancelUsernameInput() {
  isUsernameEditable.value = !isUsernameEditable.value;
  showEditUsernameInput.value = !showEditUsernameInput.value;
  // location.reload();
  // return router.push({ path: "/other/account" });
}

const usernameRules = [
  (v: string) => (v && v.length >= 4) || "Please enter your new username",
];
// EXTRA Validation if ever needed for username
// (v: string) =>
//     /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/.test(v) ||
//     "No inappropriate characters ",

// const route = useRoute();
// const routeToken = <string>route.query.token;
//updated
</script>

<template>
  <!-- v-model="valid" -->
  <VForm ref="form">
    <!-- <p class="text-subtitle-2 text-secondary mb-2">
      please enter your new username
        id="border"
         :style="`border: 2px solid ${theme.current.value.colors.companyPrimary} ; border-radius: 20px`"
    </p> -->
    <!-- <VCard flat class="bg-background pa-2" v-if="userData"> -->
    <VRow justify="start" v-if="!showEditUsernameInput" no-gutters>
      <VCol sm="3" cols="4">
        <VCardText class="font-weight-black text-subtitle-2 px-0">
          Username:
        </VCardText>
      </VCol>

      <VCol sm="6" cols="4" v-if="userData">
        <VCardText class="text-subtitle-2 text-medium-emphasis px-0">
          {{ userData.username }}
        </VCardText>
      </VCol>

      <VCol sm="3" cols="4">
        <VHover v-slot="{ isHovering, props }">
          <VBtn
            @click="toggleShowEditUsernameInput"
            rounded="xl"
            size="default"
            min-height="22"
            v-bind="props"
            :class="isHovering ? 'bg-error' : 'bg-primary'"
            class="bg-primary ml-8 px-0"
            type="submit"
            variant="text"
            >Edit</VBtn
          >
        </VHover>
      </VCol>
    </VRow>
    <!-- 
when the edit button is not clicked  -->

    <VRow class="align-center" v-if="showEditUsernameInput" no-gutters>
      <VCol sm="12" lg="2" cols="12">
        <VCardText class="font-weight-black text-subtitle-2 px-0">
          Username:
        </VCardText>
      </VCol>
      <!--     class="CompanySpecificAccountInputVField" -->
      <VCol sm="6" cols="9">
        <VCardText>
          <VTextField
            :rules="usernameRules"
            v-model="username"
            rounded="xl"
            density="comfortable"
            variant="outlined"
            name="username">
          </VTextField>
        </VCardText>
      </VCol>
      <VCol sm="6" lg="4" cols="4">
        <VHover v-slot="{ isHovering, props }">
          <VCardActions>
            <VBtn
              rounded="xl"
              min-height="22"
              v-bind="props"
              :class="isHovering ? 'bg-error' : 'bg-primary'"
              :disabled="!username || userActionDisableButtons"
              @click="handleSubmitOnSave()"
              :loading="userActionDisableButtons"
              type="submit"
              variant="text"
              >Save</VBtn
            >

            <VBtn
              rounded="xl"
              min-height="44"
              class="bg-error"
              @click="handleCancelUsernameInput"
              :loading="userActionDisableButtons"
              type="submit"
              variant="outlined">
              Cancel</VBtn
            >
          </VCardActions>
        </VHover>
      </VCol>
    </VRow>
    <!-- </VCard> -->
  </VForm>
</template>

<style>
/* #border {
  border: 2px solid black;
  border-radius: 20px;
} */
</style>
