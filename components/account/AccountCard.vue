<script setup lang="ts">
const { userData } = useAuthComposable();
const tab = ref(null);
console.log(userData.value);

const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public; //env variables
const { getCompanyConfigs, allCompanyConfigs } = useCompanyConfigs();

const showEditUsernameInput = ref(false);
const showEditPasswordInput = ref(false);

function toggleShowEditUsernameInput() {
  showEditUsernameInput.value = !showEditUsernameInput.value;
}

function toggleShowEditpasswordInput() {
  showEditPasswordInput.value = !showEditPasswordInput.value;
}

defineProps({
  companyEnvBase: Object,
});
</script>

<template>
  <VCard flat v-if="userData" class="bg-background">
    <VRow justify="start" no-gutters>
      <VCol cols="12">
        <VCardTitle class="text-h6 font-weight-black px-0">
          Personal Details
        </VCardTitle>
      </VCol>
      <VCol cols="12">
        <VCardText class="pa-0">
          <!-- v-if="isUsernameEditable" -->

          <AccountUpdateUsername :usernameProp="userData?.username" />

          <!-- {{ userData.username }} -->
        </VCardText>
      </VCol>

      <VDivider class="border-opacity-50" />

      <VCol>
        <VCardText class="pa-0">
          <AccountUpdateUserPassword />
        </VCardText>
      </VCol>

      <VDivider class="border-opacity-50" />
      <VCol sm="3" cols="4">
        <VCardText class="font-weight-bold text-subtitle-2 px-0">
          Company Name:
        </VCardText>

        <!-- {{ allCompanyConfigs }} -->
      </VCol>
      <VCol sm="9" cols="8">
        <VCardText class="px-0 text-disabled">
          {{ `${companyEnvBase.companyName} ` }}
        </VCardText>
      </VCol>

      <VDivider class="border-opacity-50" />
      <VCol sm="3" cols="4">
        <VCardText class="font-weight-bold text-subtitle-2 ml-1 px-0">
          Address:
        </VCardText>
      </VCol>

     
     

      <VCol sm="9" cols="8">
        <VCardText class="text-disabled px-0">
          {{ userData.email_address }}
        </VCardText>
      </VCol>

      <VDivider class="border-opacity-50" />
      <VCol sm="3" cols="4">
        <VCardText class="font-weight-bold text-subtitle-2 px-0">
          Telephone:
        </VCardText>
      </VCol>

     
      <VDivider class="border-opacity-50" />

      <VRow>
        <VCol class="text-center">
          <AuthDestroyUserButton />
        </VCol>
      </VRow>
    </VRow>
  </VCard>
</template>
