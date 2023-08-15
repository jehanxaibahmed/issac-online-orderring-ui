<script setup lang="ts">
const { userNeedsToAcceptCookies, updateUserPrivacySettings } = useCookies();
const { userData } = useAuthComposable();

// defineEmits(["accept", "decline"]);
const contactByEmail = ref(
  userData.value?.privacy_settings.contact_email === "1"
);
//are these equal to true 1 or false, if false the switch will slide to the left
const contactBySMS = ref(userData.value?.privacy_settings.contact_sms === "1");
const contactByPhone = ref(
  userData.value?.privacy_settings.contact_tel === "1"
);
const contactByPost = ref(
  userData.value?.privacy_settings.contact_post === "1"
);
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public; //env variables

function handleAccept() {
  userNeedsToAcceptCookies.value = false;
  updateUserPrivacySettings(
    "1",
    contactByEmail.value ? "1" : "0",
    contactBySMS.value ? "1" : "0",
    contactByPhone.value ? "1" : "0",
    contactByPost.value ? "1" : "0"
  );
}

// watch(userData, () => {
//   localStorage.setItem(
//     "userData",
//     userData.value?.privacy_settings.contact_email
//   );
// });
</script>
<template>
  <VCard flat>
    <VCardTitle class="font-weight-black text-h6 text-high-emphasis"
      >Privacy Settings</VCardTitle
    >
    <VRow>
      <VCol sm="5" cols="12">
        <VCardTitle class="font-weight-bold text-subtitle-2 pa-0 ml-4">
          Marketing Preferences</VCardTitle
        >
        <VCardText class="text-body-2 text-justify pa-0 mr-5 ml-4">
          {{ `${companyEnvBase.companyName} ` }} would like to contact you about
          offers , services and products that might interest you. If you
          <span class="font-weight-black text-body-2 text-high-emphasis">
            would like</span
          >
          to receive these communications, please select below the ways in which
          we can contact you
        </VCardText>

        <VCardText class="pa-3">
          <VRow>
            <VCol sm="6" cols="6">
              <VSwitch
                v-model="contactByEmail"
                label="By Email"
                class="text-body-2 font-weight-bold"
                @update:modelValue="handleAccept"
                flat
                hide-details
                density="compact"
                color="error" />
              <!-- email value: {{ userData?.privacy_settings.contact_email }} -->

              <span>
                <VSwitch
                  v-model="contactBySMS"
                  label="By SMS"
                  class="text-body-2 font-weight-bold"
                  flat
                  @update:modelValue="handleAccept"
                  :hide-details="true"
                  density="compact"
                  color="error" />
                <!-- sms value: {{ userData?.privacy_settings.contact_sms }} -->
              </span>
            </VCol>

            <VCol cols="6">
              <VSwitch
                v-model="contactByPhone"
                @update:modelValue="handleAccept"
                flat
                hide-details
                density="compact"
                class="text-body-2 font-weight-bold"
                label="By Telephone"
                color="error" />
              <!-- Phone value: {{ userData?.privacy_settings.contact_tel }} -->

              <VSwitch
                v-model="contactByPost"
                label="By Post"
                @update:modelValue="handleAccept"
                flat
                :hide-details="true"
                density="compact"
                class="text-body-2 font-weight-bold"
                color="error" />
              <!-- Post value: {{ userData?.privacy_settings.contact_post }} -->
            </VCol>
          </VRow>
        </VCardText>
      </VCol>

      <VCol sm="7" cols="12">
        <VCardTitle class="font-weight-bold text-subtitle-2 pa-0 ml-4">
          Cookie Policy</VCardTitle
        >
        <VCardText class="text-body-2 pa-0 mr-5 ml-4">
          We only use necessary cookies to make our site work. We do not use
          Analytic cookies. Necessary cookies enable core functionality such as
          security, network management, and accessibility.
        </VCardText>

        <VCardText class="text-b mt-1 pa-0 pa-0 mr-5 ml-4">
          As a rule, cookies will make your browsing experience better. However,
          you may prefer to disable cookies on this site and on others. The most
          effective way to do this is to disable cookies in your browser. We
          suggest consulting the Help section of your browser or taking a look
          at the

          <a
            target="_blank"
            href="https://www.aboutcookies.org/"
            class="text-decoration-underline text-error"
            >About Cookies website</a
          >

          which offers guidance for all modern browsers.
        </VCardText>
      </VCol>
      <!-- <VCardActions>
        <VBtn color="primary" variant="text" @click="handleAccept">
          Submit
        </VBtn>
      </VCardActions> -->
    </VRow>
  </VCard>
</template>
