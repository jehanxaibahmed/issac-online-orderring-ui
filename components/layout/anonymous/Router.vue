<script setup lang="ts">
import { useDisplay } from "vuetify";
const router = useRouter();
const route = useRoute();
const { xs } = useDisplay();
const currentPath = route.path; // this is a stupid solution sort it out
const anonRouteOptionsAndDetails = [
  { title: "Welcome", icon: "mdi-login-variant", route: "/" },
  { title: "About", icon: "mdi-information-outline", route: "/oldIndexPage" },
  // {
  //   title: "Sign In",
  //   icon: "mdi-login-variant",
  //   route: "/auth/sign-in",
  // },
];
const userActionDisableButtons = useUserActionDisableButtons();
</script>

<template>
  <VBtn
    v-if="!xs"
    v-for="option in anonRouteOptionsAndDetails"
    :prepend-icon="option.icon"
    @click.stop="router.push({ path: option.route })"
    :color="currentPath === option.route ? 'primary' : ''"
    :loading="userActionDisableButtons"
    :disabled="userActionDisableButtons"
    >{{ option.title }}
  </VBtn>

  <v-tooltip
    :text="option.title"
    location="bottom"
    color="primary"
    v-else
    v-for="option in anonRouteOptionsAndDetails">
    <template v-slot:activator="{ props }">
      <VBtn
        :icon="option.icon"
        :loading="userActionDisableButtons"
        :disabled="userActionDisableButtons"
        :color="currentPath === option.route ? 'primary' : ''"
        @click.stop="router.push({ path: option.route })"
        v-bind="props" />
    </template>
  </v-tooltip>
</template>
