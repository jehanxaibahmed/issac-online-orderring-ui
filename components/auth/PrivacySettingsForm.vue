<script setup lang="ts">
const { userNeedsToAcceptCookies, updateUserPrivacySettings } = useCookies();
// defineEmits(["accept", "decline"]);
const contactByEmail = ref(true);
const contactBySMS = ref(true);
const contactByPhone = ref(true);
const contactByPost = ref(true);

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
</script>
<template>
  <VCard>
    <VCardTitle><VIcon>mdi-download</VIcon>Cookie Policy</VCardTitle>
    <VCardText>
      We only use necessary cookies to make our site work. We do not use
      Analytic cookies. Necessary cookies enable core functionality such as
      security, network management, and accessibility.
      <br />
    </VCardText>
    <VCardTitle>
      <VIcon>mdi-message-text</VIcon>Marketing Communications:</VCardTitle
    >
    <VCardText>
      <VCheckbox
        v-model="contactByEmail"
        label="Allow Contact By Email"
        color="primary" />
      <VCheckbox
        v-model="contactBySMS"
        label="Allow Contact By SMS"
        color="primary" />
      <VCheckbox
        v-model="contactByPhone"
        label="Allow Contact By Telephone"
        color="primary" />
      <VCheckbox
        v-model="contactByPost"
        label="Allow Contact By Post"
        color="primary" />
    </VCardText>
    <VCardActions>
      <VBtn color="primary" variant="tonal" @click="handleAccept"> Submit </VBtn>
      <!-- 
      <v-spacer />
      <v-btn color="error" variant="text" @click="$emit('decline')">
        Disagree
      </v-btn> -->
    </VCardActions>
  </VCard>
</template>
