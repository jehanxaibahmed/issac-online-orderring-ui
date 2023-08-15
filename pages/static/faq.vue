<script setup lang="ts">
const { getFAQ, allFAQ } = useFAQ();

const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;


onMounted(async () => {
  await getFAQ();
});

definePageMeta({
});

</script>
<template>
  <VRow justify="start">
    <!-- FAQ LIST -->
    <VCol sm="6" cols="12">
      <VRow no-gutters>
        <VCol
          cols="12"
          class="text-primary text-h5 font-weight-bold text-justify mb-3">
          Frequently Asked Questions
          <VDivider />
        </VCol>

        <template
          v-for="(arrayOfFAQItems, faqCategoryHeader, faqIndex) in allFAQ">
          <VCol
            cols="12"
            class="text-primary text-h6 font-weight-bold text-justify mb-1">
            {{ faqCategoryHeader }}
          </VCol>

          <VCol cols="12" v-for="FAQItem in arrayOfFAQItems">
            <VDivider />
            <VCard flat class="bg-background">
              <VCardTitle class="text-subtitle-1 font-weight-bold pa-0">
                {{ FAQItem.question }}</VCardTitle
              >
              <VCardText class="text-medium-emphasis pa-0 mb-2 mt-1"
                >{{ FAQItem.answer }}
              </VCardText>
            </VCard>
          </VCol>
        </template>
      </VRow>
    </VCol>

    <!-- Card information  -->
    <VCol sm="1">
      <VSpacer />
    </VCol>

    <!-- FOR TESTING PURPOSES ONLY  {{ `${companyEnvBase.companyName} ` }} -->
    <VCol sm="1" cols="12" v-if="companyEnvBase.companyName === 'Arthur David'">
      <VCard width="265" height="275" flat>
        <VCardTitle class="text-h6 font-weight-black">
          Customer Care
        </VCardTitle>
        <VCardText class="font-weight-medium py-0 text-body-2">
          Available 7 days a week. If you're calling about an order,please have
          your order number to hand
        </VCardText>

        <VCardText>
          <span class="font-weight-bold"> Monday - Friday:</span> 8pm - 10pm
          <br />
          <span class="font-weight-bold"> Saturday: </span> 8am - 12noon
          <br />
          <span class="font-weight-bold"> Sunday </span> : 8am - 10pm
        </VCardText>

        <VCardTitle class="py-0 font-weight-black text-h6">
          0330 333 4441
        </VCardTitle>
        <VCardTitle class="py-0 font-weight-black text-subtitle-1">
          info@adavid.co.uk
        </VCardTitle>
      </VCard>
    </VCol>
  </VRow>
</template>
