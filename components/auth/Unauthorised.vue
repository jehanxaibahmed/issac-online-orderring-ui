<script setup lang="ts">
//Same component for both anon and authenticated users as the only difference between them should be the layout
</script>
<template>
  <VAlert class="text-center">
    <VImg width="150px" src="/img/nwslogo512.png"></VImg>
    <CustomElementsH2 headerContent="Unauthorized" />
    <CustomElementsH1 headerContent="401" />
    <VDivider />
    <CustomElementsH3
      headerContent="You do not have permission to access this page" />
  </VAlert>
</template>
