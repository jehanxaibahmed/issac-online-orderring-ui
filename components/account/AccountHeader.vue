<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
const { userData } = useAuthComposable();
const route = useRoute();
const { smAndDown, mdAndDown, mdAndUp, xs, width, xl, xlAndUp } = useDisplay();
</script>

<template>
  <VCard
    flat
    rounded="0"
    class="bg-companySecondaryPrimary"
    v-if="userData">
    <VContainer>
      <VRow class="align-end text-left justify-left" style="height: 200px">
        <VCol cols="12" md="6" class="text-h5 font-weight-black">
          Hello
          <span class="text-primary mr-2"> {{ userData.username }}. </span>
        </VCol>

        <VCol
          cols="6"
          md="3"
          class="text-subtitle-1 text-primary font-weight-black">
          Account No:
          {{ userData.account_type_number }}
        </VCol>

        <VCol
          cols="6"
          md="3"
          class="text-subtitle-1 font-weight-black text-primary">
          Account Type:
          {{ userData.account_type }}
        </VCol>
      </VRow>
    </VContainer>
  </VCard>
  <VCard v-else height="140" flat color="background"></VCard>
</template>

<style scoped>
@media (min-width: 1920px) and (max-width: 2560px) {
  .v-container {
    max-width: 1200px;
  }
}

@media (min-width: 2560px) {
  .v-container {
    max-width: 1400px;
  }
}
</style>
