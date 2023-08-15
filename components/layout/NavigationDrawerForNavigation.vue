<script setup lang="ts">
import { useDisplay } from "vuetify";

const props = defineProps({
  orderNowBtnText: {
    type: String || undefined,
    default: undefined,
  },
});
const { signOutUser } = useAuthComposable();
const { userData } = useAuthComposable();
const { mdAndDown, mdAndUp, lgAndUp } = useDisplay();
const {
  userPrefAlwaysShowNavigationDrawer,
  userPrefNavigationDrawerExpanded,
  //  enableExpandOnHoverBehaviour
} = useSetAndApplySettingsFromLocalStorage();

const { openNavigationDrawer, isTheNavigationNavDrawerExpanded } =
  usePassStateFromLayoutToPage();

const route = useRoute();

//rail = true expanded=false, set this based on local storage setting and then update local storage when this value changes
const ifTheNavDrawerIsPermementAreWeInRailMode = ref(
  !userPrefNavigationDrawerExpanded.value
);

watch(ifTheNavDrawerIsPermementAreWeInRailMode, () => {
  isTheNavigationNavDrawerExpanded.value =
    !ifTheNavDrawerIsPermementAreWeInRailMode.value;

  localStorage.setItem(
    "navigationDrawerExpanded",
    !ifTheNavDrawerIsPermementAreWeInRailMode.value + ""
  );
});
//need to reimplement saving user preference in local storage if theyd like the rail or expanded nav, 1 so it persists on page refresh and 2 so it persists on page change

//need to implement the rail > temp overlay? or maybe make it expand on hover -
//I think if we set permenant false, temp false amd ril false on product search journey icon clicked for non always show nav users it will work
// localStorage.setItem("userPrefAlwaysShowNavigationDrawerAsARail", false + "");

// watch(openNavigationDrawer, () => {
//   ifTheNavDrawerIsPermementAreWeInRailMode.value = false;
//   if (!openNavigationDrawer.value) return;
//   isTheNavigationDrawerOpen.value =
//     openNavigationDrawer.value;
// });

/**
 * THERES CERTAIN STATES YOU CAN PUT THE MENU IN IN THE PRODUCT SEARCH JOURNEY THAT BREAK IT
 *
 * I think these issues are caused by there being so many variables and factors, we have 2 instances of this menu called in each layout, each of those can be affected by 2 settings? so 2 x 2 x 2 is 8 then md and down 8 x 2 = 16? stupid number of variables!
 *
 * im going to refactor this nav drawer so inside of this component there is 2  versions of the nav drawer,
 *
 * IT IS POSSIBLE TO DO ALL OF THIS FUNCTIONALITY INSIDE OF 1 NAV DRAWER? YES!
 * IS IT EASY TO SEE WHATS GOING ON WHEN ITS ALL INSIDE OF 1 NAV DRAWER? NO!
 *
 * 1 - if mdAndDown or SETTING OFF
 *
 * 2 - if mdAndUp and SETTING ON - this is the only version that we have to play around with the rail local state and the perm rail props ect
 */
onMounted(() => {
  openNavigationDrawer.value = false; //we never want the nav drawer to be open by default so to ensure this behaviour always set it to false on mount
});
</script>

<template>
  <VNavigationDrawer
    v-if="!userPrefAlwaysShowNavigationDrawer || mdAndDown"
    v-model="openNavigationDrawer"
    :key="route.path"
    @update:model-value="
      //if a user closes by clicking on skim update state so we can open it again
      openNavigationDrawer = false
    "
    color="background"
    temporary>
    <template v-slot:prepend>
      <VList nav density="compact" variant="text" class="mb-2">
        <VBtn
          @click="
            //if user wants regular temporary nav then close nav drawer and update state for when they click to open it again
            openNavigationDrawer = false
          "
          :icon="'mdi-close'"
          variant="text" />
        <VListItem v-if="userData" lines="two" class="py-0">
          <VListItemTitle class="text-h6 font-weight-bold pb-2 text-primary">
            {{ userData.username }}
          </VListItemTitle>
          <VListItemSubtitle class="text-subtitle-2">{{
            userData.email_address
          }}</VListItemSubtitle>
        </VListItem>
        <LayoutOrderNow :buttonText="orderNowBtnText" block />
      </VList>
    </template>

    <VList nav density="compact" variant="text" v-if="userData">
      <div
        v-for="(value, key, index) in userData.acl"
        v-bind:key="index"
        class="mb-4">
        <template
          v-for="(
            listItem, index
          ) in value /*https://stackoverflow.com/a/71578931 - we have to use a template here because v-if has a higher priority than v-for? */"
          :key="index">
          <VListItem
            v-if="listItem.display"
            drawer
            exact
            router
            :to="listItem.link"
            :prepend-icon="listItem.icon"
            :title="listItem.title"
            :value="listItem.title"
            color="primary"
            class="mb-0">
            <VTooltip
              v-if="ifTheNavDrawerIsPermementAreWeInRailMode"
              location="right"
              color="primary"
              activator="parent"
              offset="12">
              {{ listItem.title }}
            </VTooltip>
          </VListItem>
        </template>
        <br />
        <VDivider class="border-opacity-100" />
      </div>
    </VList>
    <VBtn variant="text" color="primary" @click="signOutUser"> SIGN OUT </VBtn>
  </VNavigationDrawer>

  <!-- permenant nav drawer below, always permenant if this renders, rail determined by local storage and if x or burger icon clicked -->
  <VNavigationDrawer
    v-if="userPrefAlwaysShowNavigationDrawer && lgAndUp"
    :key="
      route.path +
      'key here to update selected button when route changes by other method'
    "
    color="background"
    permanent
    style="z-index: 1"
    :rail="ifTheNavDrawerIsPermementAreWeInRailMode">
    <template v-slot:prepend>
      <VList nav density="compact" variant="text" class="mb-2">
        <VBtn
          @click="
            //inside this nav drawer we want to toggle rail on or off
            ifTheNavDrawerIsPermementAreWeInRailMode =
              !ifTheNavDrawerIsPermementAreWeInRailMode
          "
          :icon="
            ifTheNavDrawerIsPermementAreWeInRailMode ? 'mdi-menu' : 'mdi-close'
          "
          variant="text" />
        <VListItem v-if="userData" lines="two" class="py-0">
          <template
            v-slot:prepend
            v-if="ifTheNavDrawerIsPermementAreWeInRailMode">
            <v-avatar color="primary" size="24">
              <span>{{ userData.username.at(0) }}</span>
            </v-avatar>
          </template>
          <VListItemTitle class="text-h6 font-weight-bold pb-2 text-primary">
            {{ userData.username }}
          </VListItemTitle>
          <VListItemSubtitle class="text-subtitle-2">{{
            userData.email_address
          }}</VListItemSubtitle>

          <VTooltip
            v-if="ifTheNavDrawerIsPermementAreWeInRailMode"
            location="right"
            color="primary"
            activator="parent"
            offset="12">
            {{ userData.username }}
            <br />
            {{ userData.email_address }}
          </VTooltip>
        </VListItem>
        <LayoutOrderNow
          :buttonText="orderNowBtnText"
          block
          v-if="!ifTheNavDrawerIsPermementAreWeInRailMode" />
      </VList>
    </template>

    <VList nav density="compact" variant="text" v-if="userData">
      <div
        v-for="(value, key, index) in userData.acl"
        v-bind:key="index"
        class="mb-4">
        <template
          v-for="(
            listItem, index
          ) in value /*https://stackoverflow.com/a/71578931 - we have to use a template here because v-if has a higher priority than v-for? */"
          :key="index">
          <VListItem
            v-if="listItem.display"
            drawer
            exact
            router
            :to="listItem.link"
            :prepend-icon="listItem.icon"
            :title="listItem.title"
            :value="listItem.title"
            color="primary"
            class="mb-0">
            <VTooltip
              v-if="ifTheNavDrawerIsPermementAreWeInRailMode"
              location="right"
              color="primary"
              activator="parent"
              offset="12">
              {{ listItem.title }}
            </VTooltip>
          </VListItem>
        </template>
        <br />
        <VDivider
          class="border-opacity-100"
          v-if="
            !ifTheNavDrawerIsPermementAreWeInRailMode ||
            index !== 3 /*worst code in
        the app haha */
          " />
      </div>
    </VList>
    <VBtn
      v-if="!ifTheNavDrawerIsPermementAreWeInRailMode"
      variant="text"
      color="primary"
      @click="signOutUser">
      Sign Out
    </VBtn>
  </VNavigationDrawer>
</template>
