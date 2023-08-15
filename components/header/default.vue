<script setup lang="ts">
import type { Ref } from "vue";
import { useDisplay } from "vuetify";
import { useTheme } from "vuetify/lib/framework.mjs";

const { getCompanyConfigs, allCompanyConfigs } = useCompanyConfigs();

const { smAndDown, mdAndDown, lgAndUp, mdAndUp, xs, width, xl, xlAndUp } =
  useDisplay();

const { userPrefAlwaysShowNavigationDrawer } = useSetAndApplySettingsFromLocalStorage();
const { openNavigationDrawer } = usePassStateFromLayoutToPage();


const router = useRouter();

const { signOutUser } = useAuthComposable();

</script>


<template>
    <!-- Layout Side Drawerers -->
    <LayoutNavigationDrawerForNavigation
      v-if="!userPrefAlwaysShowNavigationDrawer || mdAndDown" />
    <LayoutNavigationDrawerForNavigation
      v-if="userPrefAlwaysShowNavigationDrawer && lgAndUp" />


    <!-- Desktop -->
     <VAppBar
      v-if="mdAndUp"
      color="primary"
      max-width="100vw"
      elevation="4"
      flat
      height="93"
      style="border-bottom: none; border-width: thin; z-index: 1">
      <VRow no-gutters>
        <VRow no-gutters class="align-center float-left">
          <VCol
            cols="1"
            v-if="
              mdAndDown || (mdAndUp && !userPrefAlwaysShowNavigationDrawer)
            ">
            <VAppBarNavIcon
              class="float-left"
              size="x-large"
              @click="openNavigationDrawer = true" />
          </VCol>
          <VCol
            :cols="mdAndDown || !userPrefAlwaysShowNavigationDrawer ? 11 : 12"
            style="z-index: 3">
            <h3 class="text-h5 px-3">
              {{ allCompanyConfigs?.general.company.app_bar.message }}
            </h3>
          </VCol>
        </VRow>

        <VRow
          no-gutters
          height=""
          class="align-center justify-center float-center">
          <!-- <VImg z-index="2" src="img/wpADplace.png" height="86" /> -->
        </VRow>
        <VRow no-gutters class="float-right">
          <VCol cols="12" class="text-right">
            <VBtn variant="text" style="text-transform: capitalize" to="/home"
              >home
            </VBtn>
            |
            <VBtn
              variant="text"
              style="text-transform: capitalize"
              to="/account/"
              >your account
            </VBtn>
            |
            <VBtn
              variant="text"
              style="text-transform: capitalize"
              to="/static/faq"
              >help</VBtn
            >
            |
            <VBtn
              variant="text"
              style="text-transform: capitalize"
              @click="signOutUser"
              >sign out</VBtn
            >
          </VCol>
          <VCol cols="12" class="text-right">
            <LayoutAvatarSettingsDropdown />
          </VCol>
        </VRow>
      </VRow>
    </VAppBar>
    <!-- Desktop -->


    <!-- Mobile -->
    <VAppBar
      v-if="smAndDown"
      color="primary"
      max-width="100vw"
      flat
      elevation="4"
      height="50"
      style="z-index: 2">
      <VRow class="align-center">
        <VCol cols="6" class="text-left">
          <VIcon @click="openNavigationDrawer = true" class="pl-2" size="large"
            >mdi-menu</VIcon
          >
        </VCol>
        <VSpacer />
        <VCol cols="6" class="text-right">
          <VIcon
            class="pr-2"
            size="large"
            @click="
              async () => {
                await router.push('/orders');
              }
            "
            >mdi-calendar-month</VIcon
          >
        </VCol>
      </VRow>
    </VAppBar>
    <!-- Mobile -->



</template>