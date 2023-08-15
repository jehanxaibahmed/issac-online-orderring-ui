<script setup lang="ts">
import { useDisplay, useLayout } from "vuetify";
const { height, width, name } = useDisplay();
const runtimeConfig = useRuntimeConfig();
const {
  isTheNavigationNavDrawerExpanded /*hopefully theres a more elegant solution for this */,
} = usePassStateFromLayoutToPage();
const { userPrefAlwaysShowNavigationDrawer } =
  useSetAndApplySettingsFromLocalStorage();
</script>

<template>
  <v-sheet
    color="pink"
    class="text-center"
    v-if="runtimeConfig.public.enviroment !== `production`">
    Height: {{ height }} width: {{ width }} current breakpoint: {{ name }} Nav
    Expanded: {{ isTheNavigationNavDrawerExpanded }} always Show Nav:
    {{ userPrefAlwaysShowNavigationDrawer }}</v-sheet
  >
</template>
