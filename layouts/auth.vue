<script setup lang="ts">
import { useTheme, useDisplay } from "vuetify/lib/framework.mjs";
const { smAndDown, mdAndDown, mdAndUp, xs, width, xl, xlAndUp } = useDisplay();
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const { getCompanyConfigs, allCompanyConfigs } = useCompanyConfigs();
const displayLoading = ref(true);
const router = useRouter();
const vuetify = useTheme();

onMounted(async () => {
  if (!allCompanyConfigs.value) {
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

    <NuxtLoadingIndicator />
    <HeaderAuth  :allCompanyConfigs="allCompanyConfigs" />


    <VMain v-if="!displayLoading">
      <SnackBaar />
      <UtilzSnackbar />
      <VContainer
        fill-height
        :style="xlAndUp ? 'padding-left: 256px; padding-right: 256px;' : ''">
        <LoadingDialog />
        <LayoutFooter :companyEnvBase="companyEnvBase" />
        <slot />
      </VContainer>
    </VMain>


    <VMain v-else>
      <DisplayLoadingScreen />
    </VMain>




    <FooterAuth />


  </VApp>




  
</template>


<style>
#tidio-chat-iframe {
  left: 50px !important;
}
</style>
