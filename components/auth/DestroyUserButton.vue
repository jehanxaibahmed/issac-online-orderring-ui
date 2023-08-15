<script setup lang="ts">
const userActionDisableButtons = useUserActionDisableButtons();
const { destroyUser } = useAuthComposable();
const dialog = ref(false);
const email: Ref<string> = ref("");
defineProps({
  railButton: Boolean,
});
</script>

<template>
  <!-- <VTooltip v-if="railButton" location="right" text="Delete" offset="12"> -->
  <VDialog v-model="dialog" persistent width="auto">
    <template v-slot:activator="{ props }">
      <VBtn
        color="error"
        v-bind="props"
        class="mx-0 font-weight-bold"
        variant="text">
        Deactivate Account
      </VBtn>
    </template>
    <VCard>
      <VCardTitle class="text-h5"> Deactivate Account </VCardTitle>
      <VCardText>
        You are about to delete your account, this action is irreversible are
        you sure?
      </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="green-darken-1" variant="text" @click="dialog = false">
          NO
        </VBtn>

        <VBtn
          color="red-darken-1"
          rounded="lg"
          size="small"
          text="test"
          icon="mdi-delete-empty-outline"
          @click="destroyUser()"
          :loading="userActionDisableButtons"
          :disabled="userActionDisableButtons">
          YES
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <!-- </VTooltip> -->
</template>
