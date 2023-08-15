<script setup lang="ts">
import { useDisplay } from "vuetify";
const { height, width, xs } = useDisplay();
defineProps({
  headerContent: String,
});
</script>

<template>
  <h2 :class="[width < 499 ? 'text-h3' : 'text-h2', 'text-wrap']">
    {{ headerContent }}
  </h2>
</template>
