<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const { getCompanyConfigs, allCompanyConfigs } = useCompanyConfigs();

</script>

<template>
  <VFooter app absolute class="bg-footer">
    <VCol cols="12" class="text-center">
      <VRow justify="center">
        <VCol class="" cols="12">
          <FooterSocialMedia />
        </VCol>

        © {{ `${new Date().getFullYear()} - ${companyEnvBase.companyName} ` }}
        <VCol cols="12" class="text-center">
          Powered by <strong>Issac</strong> Systems Ltd
        </VCol>
      </VRow>
    </VCol>
  </VFooter>
</template>
