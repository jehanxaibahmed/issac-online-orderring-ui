<script setup lang="ts">
import { useTheme } from "vuetify/lib/framework.mjs";

const { getCompanyConfigs, allCompanyConfigs } = useCompanyConfigs();
const displayLoading = ref(true);
const vuetify = useTheme();
onMounted(async () => {
  if (!allCompanyConfigs.value) {
    //if we already have the configs dont need to get them again, !{} added back for stupid typescript
    await getCompanyConfigs();
  }
  if (!allCompanyConfigs.value) return;
  //applying the 'custom' vuetify theme choices has to happen in a script setup
  //primary
  vuetify.themes.value.myCustomDarkTheme.colors.primary = "#00447e";
    vuetify.themes.value.myCustomLightTheme.colors.primary = "#00447e";
  //company primary
  vuetify.themes.value.myCustomDarkTheme.colors.companyPrimary = "#00447e";
  vuetify.themes.value.myCustomLightTheme.colors.companyPrimary = "#00447e";
  //secondary
  vuetify.themes.value.myCustomDarkTheme.colors.secondary = "#333333";
  vuetify.themes.value.myCustomLightTheme.colors.secondary = "#333333";
  //footer
  vuetify.themes.value.myCustomDarkTheme.colors.footer = "#333333";
  vuetify.themes.value.myCustomLightTheme.colors.footer = "#333333";
  displayLoading.value = false;
});

</script>

<template>
  <VApp max-width="100vw">
    
   <HeaderDefault />
   

    <NuxtLoadingIndicator />

        <SnackBar />
        <SnackBaar />
        <LoadingDialog />
        <AuthCookiesDialog />
    
    
    <VMain v-if="!displayLoading" class="pt-20">
      <VContainer class="pt-5">
        <DevelopmentToolsViewportSizeAndBreakpointsHelper />
        <UtilzBreadCrumbs  />

        <slot />
      </VContainer>
    </VMain>




    <VMain v-else>
      <DisplayLoadingScreen />
    </VMain>


    <FooterDefault />
  </VApp>



</template>

<style scoped>
@media (min-width: 1920px) and (max-width: 2560px) {
  .v-container {
    max-width: 1200px;
  }
}

@media (min-width: 2560px) {
  .v-container {
    max-width: 1400px;
  }
}
</style>
