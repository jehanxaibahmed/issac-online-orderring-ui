<script setup lang="ts">
import { useTheme } from "vuetify";
import type { Ref } from "vue";
const theme = useTheme();
const props = defineProps({
  color: {
    type: String,
    default: "primary",
  },
});
const isDark: Ref<Boolean> = ref(theme.global.current.value.dark);
console.log(isDark.value);
const btnIcon: Ref<string> = ref(
  isDark ? "mdi-weather-night" : "mdi-white-balance-sunny"
);
const tooltip: Ref<string> = ref("Dark Mode");
function makeDark() {
  theme.global.name.value = "myCustomDarkTheme";
  isDark.value = true;
  btnIcon.value = "mdi-white-balance-sunny";
  tooltip.value = "Light Mode";
  localStorage.setItem("userThemePref", "Dark Mode");
}
function makeLight() {
  theme.global.name.value = "myCustomLightTheme";
  isDark.value = false;
  btnIcon.value = "mdi-weather-night";
  tooltip.value = "Dark Mode";
  localStorage.setItem("userThemePref", "Light Mode");
}
const toggle = ref(true);
onBeforeMount(() => {
  // console.log("theme persist check made");
  //this component is on every page of the app, if we check persistant before its mount it means all theme changing logic can live in this component
  const localStorageThemeData = <null | string>(
    localStorage.getItem("userThemePref")
  );
  console.log(localStorageThemeData);
  if (!localStorageThemeData || localStorageThemeData === "Light Mode") {
    return makeLight();
  }
  makeDark();
  return (toggle.value = false);
});
</script>
<template>
 
  <v-switch
    :color="color"
    v-model="toggle"
    prepend-icon="mdi-weather-night"
    append-icon="mdi-white-balance-sunny"
    @click="isDark ? makeLight() : makeDark()" />

    
</template>
