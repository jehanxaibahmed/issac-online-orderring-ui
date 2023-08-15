<script setup lang="ts">

definePageMeta({
  // middleware: "anon",
});
const { userData } = useAuthComposable();
const tab = ref(null);
console.log(userData.value);
</script>

<template>

  <VRow justify="start">
    <VCol cols="12" sm="6">
      <AccountCard />
    </VCol>
    <VCol cols="12" md="6">
      <AccountDeliveryDetailsCard />
    </VCol>
    <VCol cols="12">
      <AccountPrivacySettingsAccount />
    </VCol>
  </VRow>
</template>

<style>

</style>
