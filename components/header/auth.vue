<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const { locale } = useI18n()
const { signOutUser } = useAuthComposable();
const { getCompanyConfigs, allCompanyConfigs } = useCompanyConfigs();

const router = useRouter();
const route = useRoute();
</script>


<template>
  <VAppBar color="info" flat height="86" style="border-bottom: none; border-width: thin; z-index: 1">
    <template v-slot:prepend>
      <h3 class="text-h6 px-3">
        {{ allCompanyConfigs?.general.company.app_bar.message }}
      </h3>
    </template>




    <VToolbarTitle @click.stop="router.push({ path: '/' })" style="cursor: pointer" class="text-h5 px-3">
      {{ companyEnvBase.companyName }} {{ companyEnvBase.appName }}
    </VToolbarTitle>




    <template v-slot:append>
      <v-select aria-setsize="small" variant="outlined"  class="mx-5 mt-3" v-model="locale"  :items="['EN', 'FR']"></v-select>

      <LayoutTheme class="pt-5" :color="'background'" />
    </template>



  </VAppBar>
</template>


