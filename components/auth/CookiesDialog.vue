<script setup lang="ts">
const { userNeedsToAcceptCookies } = useCookies();
console.log(userNeedsToAcceptCookies.value);
</script>
<template>
  <VDialog v-model="userNeedsToAcceptCookies" persistent class="w-75">
    <AuthPrivacySettingsForm />
  </VDialog>
</template>
