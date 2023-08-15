<script setup lang="ts">
import { replaceColor } from "lottie-colorify"; //TODO: do we need this entire package? just steal the function out of the package??
import { useTheme } from "vuetify/lib/framework.mjs";
const theme = useTheme();
const primary = theme.current.value.colors.companyPrimary;
const props = defineProps({
  sourceJSON: Object,
  direction: String || undefined,
  speed: Number || undefined,
});
const replacedColorJSON = replaceColor("#000000", primary, props.sourceJSON);
</script>
<template>
  <Vue3Lottie
    :animationData="replacedColorJSON"
    :direction="direction ? direction : 'forward'"
    :speed="speed ? speed : 1" />
</template>
