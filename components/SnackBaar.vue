<template>
    <!-- THE TIMEOUT ON THE VSNACKBAR COMPONENT HAS TO BE SET TO -1 FOR PERSISTENCE TO WORK, WE ARE NOT USING THE BUILT-IN LOGIC HERE -->
    <VSnackbar
      v-model="snackBarStore.snackBarShow"
      :key="snackBarStore.snackbarData?.message"
      timeout="-1"
      multi-line
      :color="snackBarStore.snackbarData?.statusColor && snackBarStore.snackbarData?.statusColor.length > 1 ? snackBarStore.snackbarData?.statusColor : ''"
    >
      <VProgressLinear :model-value="countdownForProgressBar" class="mb-2" />
      <VCard flat class="bg-transparent">
        <VRow class="align-center">
          <VCardText class="text-capitalize">
            <VIcon v-if="snackBarStore.snackbarData?.icon" :icon="snackBarStore.snackbarData?.icon" />
  
            {{ snackBarStore.snackbarData?.message.trim() }}
  
            <div v-if="snackBarStore.snackbarData?.statusCode">
              <VDivider />
              Status Code: {{ snackBarStore.snackbarData?.statusCode }}
            </div>
          </VCardText>
  
          <!-- <template v-slot:actions> -->
          <VBtn
            class="float-right"
            v-if="snackBarStore.snackbarData?.restoreButton && snackBarStore.functionToCallIfRestoreButtonClicked"
            variant="text"
            :disabled="userActionDisableButtons"
            :loading="userActionDisableButtons"
          >
            {{ "Restore" }}
          </VBtn>
  
          <VIcon
            @click="
              countdownForProgressBar = 0; //stop the loop
              snackBarStore.snackBarShow = false;
            "
            variant="text"
            icon="mdi-close"
            class="pr-6"
            :disabled="userActionDisableButtons"
            :loading="userActionDisableButtons"
            end
          />
          <!-- </template> -->
        </VRow>
      </VCard>
    </VSnackbar>
  </template>
  
  <script setup lang="ts">
  import { useSnackbarStore } from '~/store/snackbar';
  import { ref, watch, onMounted } from 'vue';
  

    const userActionDisableButtons = useUserActionDisableButtons();

    const snackBarStore = useSnackbarStore();

    const countdownForProgressBar = ref(100);
  
  watch(snackBarStore, (snackBarStore) => {
    if (!snackBarStore.snackBarShow) {
      snackBarStore.checkTheArrayOfQueuedSnackbars();
      return;
    }
  
    if (snackBarStore.snackbarData?.timeoutLength && snackBarStore.snackbarData?.timeoutLength <= 0) {
      return; // User has to manually close persistent snackbars
    }
  
    countdownForProgressBar.value = 100;
  
    handleSnackbarTimerLogic();
  });

  
  // TODO: 19/04 This can stay Must be a better way to do this?
  onMounted(() => {
    if (snackBarStore.snackBarMountedLimiter !== 0) {
      return; // Only want to run this on first render because the watcher doesn't behave properly
    }
    snackBarStore.snackBarMountedLimiter ++;
    if (snackBarStore.snackbarData?.timeoutLength && snackBarStore.snackbarData?.timeoutLength <= 0) {
      return; // User has to manually close persistent snackbars
    }
  
    countdownForProgressBar.value = 100;
  
    handleSnackbarTimerLogic();
  });
  
  let interval: NodeJS.Timeout;
  
  function handleSnackbarTimerLogic() {
    // If the snackbar is showing, we need to start the timer
    if (interval) clearInterval(interval); // Need to clear old intervals if they exist, aka when the user clicks on the x button
    if (
      (snackBarStore.snackbarData?.timeoutLength && snackBarStore.snackbarData?.timeoutLength <= 0) || // Set to less than 0
      !snackBarStore.snackbarData // If no snackbar data, can't get here
    ) {
      return; // User has to manually close persistent snackbars
    }
  
    interval = setInterval(() => {
      countdownForProgressBar.value -= 2;
      if (countdownForProgressBar.value <= 0) {
        clearInterval(interval);
        snackBarStore.snackBarShow = false;
      }
    }, snackBarStore.snackbarData?.timeoutLength / 50);
  }
  </script>
  
  <style></style>
  