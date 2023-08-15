<script setup lang="ts">
type ButtonArr = Button[];
interface Button {
  route: { path: string };
  text: string;
  color: string;
}
defineProps<{
  title: String;
  buttons: ButtonArr;
}>();
</script>

<template>
  <v-banner
    lines="one"
    elevation="0"
    :border="3"
    class="pageTitleBackground pa-0">
    <v-banner-text>
      <h2>{{ title }}</h2>
    </v-banner-text>

    <template v-slot:actions>
      <v-btn
        v-for="(button, key, index) in buttons"
        v-bind:key="index"
        :color="button.color"
        :to="button.route"
        >{{ button.text }}</v-btn
      >
    </template>
  </v-banner>
</template>

<style lang="sass">
.pageTitleBackground
  background: rgb(var(--v-theme-background))
  border: 0

.v-banner-actions
  margin-top: 0 !important
</style>
