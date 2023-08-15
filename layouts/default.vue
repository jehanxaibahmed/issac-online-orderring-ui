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
  vuetify.themes.value.myCustomDarkTheme.colors.primary =
    allCompanyConfigs.value.general.theme.primary_colour;
  vuetify.themes.value.myCustomLightTheme.colors.primary =
    allCompanyConfigs.value.general.theme.primary_colour;
  //company primary
  vuetify.themes.value.myCustomDarkTheme.colors.companyPrimary =
    allCompanyConfigs.value.general.theme.company_primary_colour;
  vuetify.themes.value.myCustomLightTheme.colors.companyPrimary =
    allCompanyConfigs.value.general.theme.company_primary_colour;
  //secondary
  vuetify.themes.value.myCustomDarkTheme.colors.secondary =
    allCompanyConfigs.value.general.theme.secondary_colour;
  vuetify.themes.value.myCustomLightTheme.colors.secondary =
    allCompanyConfigs.value.general.theme.secondary_colour;
  //footer
  vuetify.themes.value.myCustomDarkTheme.colors.footer =
    allCompanyConfigs.value.general.theme.footer_colour;
  vuetify.themes.value.myCustomLightTheme.colors.footer =
    allCompanyConfigs.value.general.theme.footer_colour;
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
