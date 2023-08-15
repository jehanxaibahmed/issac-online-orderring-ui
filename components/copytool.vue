<script lang="ts" setup>
const props = defineProps({
  storeCopiedData: String,
  size: { type: String, default: "" },
});

// this stores the copied data in the prop storeCopiedData
</script>

<template>
  <!-- @click="copyToClipboard(storeCopiedData ? storeCopiedData : '')" 
    this is calling the method copyToClipboard and passing the prop in 
    the parameter so data is stored in the prop, the  method is being pulled from the folder utils file copyToolHandler.ts  -->
  <!-- self seems to disable it
   -->
  <VBtn
    icon="mdi-content-copy"
    @click="copyToClipboard(storeCopiedData ? storeCopiedData : '')"
    :size="size"
    variant="text">
  </VBtn>
</template>
