<script setup lang="ts">
import { useTheme } from "vuetify";
const items = [
  { title: "Settings", icon: "mdi-cog", to: "/other/settings", key: 111 },
  {
    title: "Account",
    icon: "mdi-account",
    to: "/other/account",
    key: 222,
  },
  {
    title: "FAQ",
    icon: "mdi-comment-question",
    to: "/other/faq",
    key: 333,
  },
];
const userActionDisableButtons = useUserActionDisableButtons();

//the below is the logic from the theme switcher button. becuase this now isnt always visible on the app bar the logic that was makign the theme persist work no longer works i.e the component is rendered on every page thus we can use onBeforeMount for the persistance checks, for a quick fix it also runs here, will refactor once the final place for the theme switcher button has been decided
const theme = useTheme();
const isDark = ref(theme.global.current.value.dark);

function makeDark() {
  theme.global.name.value = "myCustomDarkTheme";
  isDark.value = true;
  // btnIcon.value = "mdi-white-balance-sunny";
  // tooltip.value = "Light Mode";
  localStorage.setItem("userThemePref", "Dark Mode");
}
function makeLight() {
  theme.global.name.value = "myCustomLightTheme";
  isDark.value = false;
  // btnIcon.value = "mdi-weather-night";
  // tooltip.value = "Dark Mode";
  localStorage.setItem("userThemePref", "Light Mode");
}
onBeforeMount(() => {
  // console.log("theme persist check made");
  //this component is on every page of the app, if we check persistant before its mount it means all theme changing logic can live in this component
  const localStorageThemeData = <null | string>(
    localStorage.getItem("userThemePref")
  );
  console.log(localStorageThemeData);
  if (!localStorageThemeData || localStorageThemeData === "Light Mode") {
    makeLight();
    return;
  }
  makeDark();
  return;
});
</script>
<template>
  <VMenu open-on-hover>
    <template v-slot:activator="{ props }">
      <VBtn
        color=""
        v-bind="props"
        icon="mdi-cog"
        :loading="userActionDisableButtons"
        :disabled="userActionDisableButtons" />
      <!-- too far?  -->
    </template>
    <VList>
      <VListItem style="margin-bottom: -32px; margin-top: -12px">
        <LayoutTheme
      /></VListItem>
      <VListItem
        v-for="(item, index) in items"
        :key="index"
        exact
        router
        :to="item.to"
        :value="item.title"
        :title="item.title"
        :prepend-icon="item.icon" />
    </VList>
  </VMenu>
</template>
