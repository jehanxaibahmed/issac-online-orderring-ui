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
