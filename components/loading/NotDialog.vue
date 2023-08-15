<script setup lang="ts">
//@ts-expect-error Lottie File
import mixingBowlAnimation from "/src/lottie/preparingFoodLoadingCustColorHex000000.json";
</script>

<template>
  <div>
    <LottieAnimation
      class="h-auto w-auto"
      :sourceJSON="mixingBowlAnimation"
      :speed="1" />
  </div>
</template>

<style></style>
