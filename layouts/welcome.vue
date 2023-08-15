<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public; //env variables
const router = useRouter();
</script>

<template>
  <VApp max-width="100vw">
    <VAppBar flat>
      <template v-slot:prepend> </template>
      <template v-slot:append>
        <LayoutTheme />
      </template>
    </VAppBar>
    <VMain>
      <SnackBar />
      <VContainer fill-height>
        <LoadingDialog />
        <slot />
      </VContainer>
    </VMain>
    <VFooter app>
      <span
        >{{ `${new Date().getFullYear()} - ${companyEnvBase.companyName} `
        }}<b> {{ `${companyEnvBase.appName} ` }} </b>from Nationwilcox Systems
        Ltd</span
      >
    </VFooter>
  </VApp>
</template>
<style></style>
