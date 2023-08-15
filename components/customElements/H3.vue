<script setup lang="ts">
import { useDisplay } from "vuetify";
const { height, width, xs } = useDisplay();
defineProps({
  headerContent: String,
});
</script>

<template>
  <h3 :class="['text-h4', 'text-medium-emphasis']" class="z-index: 2">
    {{ headerContent }}
  </h3>
</template>
