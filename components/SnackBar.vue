<script setup lang="ts">
import { clear } from "console";

// here we are destructuring out our properties
const {
  displaySnackbar,
  checkTheArrayOfQueuedSnackbars,
  snackBarShow,
  snackbarData,
  functionToCallIfRestoreButtonClicked,
  snackBarMountedLimiter,
  arrayOfQueuedSnackbars,
} = useSnackBar();

const router = useRouter();

// from the useSnackBar.ts so we can use them in our component just as we would with props
const userActionDisableButtons = useUserActionDisableButtons();

const countdownForProgressBar = ref(100);

watch(snackBarShow, (isTheSnackbarShowing) => {
  if (!isTheSnackbarShowing) {
    checkTheArrayOfQueuedSnackbars();
    return;
  }

  if (
    snackbarData.value?.timeoutLength && //undefined for ts
    snackbarData.value?.timeoutLength <= 0 //set to less than 0
  ) {
    return; //user has to manually close persistant snackbars
  }

  countdownForProgressBar.value = 100;

  handleSnackbarTimerLogic();
});

//TODO: 19/04 This can stay Must be a better way to do this?
onMounted(() => {
  if (snackBarMountedLimiter.value !== 0) {
    return; //only want to run this on first render because the watcher doesnt behave properly
  }
  snackBarMountedLimiter.value++;
  if (
    snackbarData.value?.timeoutLength && //undefined for ts
    snackbarData.value?.timeoutLength <= 0 //set to less than 0
  ) {
    return; //user has to manually close persistant snackbars
  }

  countdownForProgressBar.value = 100;

  handleSnackbarTimerLogic();
});

let interval: NodeJS.Timeout;
function handleSnackbarTimerLogic() {
  //if the snackbar is showing then we need to start the timer
  if (interval) clearInterval(interval); //need to clear old intervals if they exist, aka when user clicks on the x button
  if (
    (snackbarData.value?.timeoutLength && //undefined for ts
      snackbarData.value?.timeoutLength <= 0) || //set to less than 0
    !snackbarData.value //ts if no snackbar data cant get here
  ) {
    return; //user has to manually close persistant snackbars
  }
  // let what = 1;
  interval = setInterval(() => {
    countdownForProgressBar.value -= 2;
    // console.log(interval, countdownForProgressBar.value, what);
    // what++;
    if (countdownForProgressBar.value <= 0) {
      clearInterval(interval);
      snackBarShow.value = false;
    }
  }, snackbarData.value?.timeoutLength / 50);
}
</script>
<template>
  <!-- THE TIMEOUT ON THE VSNACKBAR COMPONENT HAS TO BE SET TO -1 FOR PERSISTANCE TO WORK, WE ARE NOT USING THE BUILT IN LOGIC HERE -->
  <VSnackbar
    v-model="snackBarShow"
    :key="snackbarData?.message"
    timeout="-1"
    multi-line
    :color="
      snackbarData?.statusColor && snackbarData?.statusColor.length > 1
        ? snackbarData?.statusColor
        : ''
    ">
    <VProgressLinear :model-value="countdownForProgressBar" class="mb-2" />
    <VCard flat class="bg-transparent">
      <VRow class="align-center">
        <VCardText class="text-capitalize">
          <VIcon v-if="snackbarData?.icon" :icon="snackbarData?.icon" />

          {{ snackbarData?.message.trim() }}

          <div v-if="snackbarData?.statusCode">
            <VDivider />
            Status Code: {{ snackbarData?.statusCode }}
          </div>
        </VCardText>

        <!-- <template v-slot:actions> -->
        <VBtn
          class="float-right"
          v-if="
            snackbarData?.restoreButton && functionToCallIfRestoreButtonClicked
          "
          variant="text"
          :disabled="userActionDisableButtons"
          :loading="userActionDisableButtons"
          >{{ "Restore" }}</VBtn
        >

        <VIcon
          @click="
            countdownForProgressBar = 0; //stop the loop
            snackBarShow = false;
          "
          variant="text"
          icon="mdi-close"
          class="pr-6"
          :disabled="userActionDisableButtons"
          :loading="userActionDisableButtons"
          end />
        <!-- </template> -->
      </VRow>
    </VCard>
  </VSnackbar>
</template>

<style></style>
