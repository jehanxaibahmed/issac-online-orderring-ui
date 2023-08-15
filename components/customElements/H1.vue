<script setup lang="ts">
import { useDisplay } from "vuetify";
const { height, width, xs } = useDisplay();
defineProps({
  headerContent: String,
});
</script>

<template>
  <!-- <h1
    :class="[width < 499 ? 'text-h2' : 'text-h1', 'text-primary', 'text-wrap']"
  > -->

  <h1
    :class="[
      'text-primary',
      'text-wrap',
      'text-lg-h1', // large screen sizes
      'text-md-h2', // medium screen sizes
      'text-sm-h3', //small screen size
      'text-h4', //extra small screen size
      // 'text-body-1'
    ]">
    {{ headerContent }}
  </h1>
</template>
