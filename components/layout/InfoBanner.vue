<script setup lang="ts">
const { bannerMessage, displayBannerToUser } = useCompanyBanner();
//const { userData } = useAuthComposable();
//const pretendVhtml = `<p><strong>Hello ${userData.value?.username}!</strong> This is an example banner which can be set in the backend and accessed through a composable api call!<p>`;
//call to backend with composable, if the data exists render a banner with v-html
</script>
<template>
  <!-- <v-banner sticky lines="one"> -->
  <VAlert sticky closable color="info" v-model="displayBannerToUser">
    <template v-slot:text>
      <span v-html="bannerMessage"></span>
    </template>
  </VAlert>
</template>
