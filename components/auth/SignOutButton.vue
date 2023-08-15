<script setup lang="ts">
const userActionDisableButtons = useUserActionDisableButtons();
const { signOutUser } = useAuthComposable();
defineProps({
  railButton: Boolean,
});
</script>

<template>
  <VTooltip v-if="railButton" location="right" text="Sign Out" offset="12">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        rounded="lg"
        size="small"
        color="error"
        icon="mdi-logout-variant"
        @click="signOutUser()"
        :loading="userActionDisableButtons"
        :disabled="userActionDisableButtons" />
    </template>
  </VTooltip>
  <VBtn
    v-else
    color="error"
    @click="signOutUser()"
    :loading="userActionDisableButtons"
    :disabled="userActionDisableButtons"
    elevation="1">
    Sign Out
  </VBtn>
</template>
