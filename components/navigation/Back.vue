<script setup lang="ts">
const userActionDisableButtons = useUserActionDisableButtons();
defineProps({
  buttonText: String,
});
</script>

<template>
  <VBtn
    :disabled="userActionDisableButtons"
    :loading="userActionDisableButtons">
    {{ buttonText }}
  </VBtn>
</template>
