<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const {
  userPrefAlwaysShowNavigationDrawer,
} = useSetAndApplySettingsFromLocalStorage();

watch(userPrefAlwaysShowNavigationDrawer, () => {
  localStorage.setItem(
    "alwaysShowNavigationMenus",
    userPrefAlwaysShowNavigationDrawer.value + ""
  );
});
</script>
<template>
  <VRow>
    <VCol cols="12"> <h1>Settings</h1></VCol>
    <VCol cols="12">
      <h2>Other Settings</h2>
      <v-switch
        v-model="userPrefAlwaysShowNavigationDrawer"
        label="Always Show Navigation Rail (Desktop Only)"
        color="success"
        inset
        hide-details>
      </v-switch>
    </VCol>
  </VRow>
</template>
