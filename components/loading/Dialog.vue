<script setup lang="ts">
// @ts-expect-error fine for now
import mixingBowlAnimation from "/src/lottie/preparingFoodLoadingCustColorHex000000.json";
const dialogShow = useLoadingDialog();
</script>

<template>
  <div>
    <!-- div needed otherwise the dialog bugs out and appears on its own once a v-text-input is selected??? -->
    <VDialog
      v-model="dialogShow"
      activator="parent"
      absolute
      persistent
      height="33vh"
      width="33vh">
      <VCard>
        <LottieAnimation
          class="h-auto w-auto"
          :sourceJSON="mixingBowlAnimation"
          :speed="1" />
      </VCard>
    </VDialog>
  </div>
</template>

<style></style>
