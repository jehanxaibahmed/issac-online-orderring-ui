<script setup lang="ts">
import { useDisplay } from "vuetify";

defineProps({
  cardTitle: String,
  cardSubtitle: String || undefined,
  cardMainText: String || undefined,
  cardImage: String || undefined,
});
const { height, width, xs, md, sm } = useDisplay();
</script>
<!-- 
problem areas: 
599  - 808px fixed?
599  - 808px fixed?
md
-->
<template>
  <VCol :class="['text-center']">
    <VCol cols="12">
      <VCardTitle v-if="cardTitle">
        <!-- width < 499 || (width > 599 && width < 808) || md ? 'text-h3' : 'text-h3', -->

        <h1
          :class="[
            'text-primary',
            'text-wrap',
            'text-lg-h3 ', // large screen sizes
            'text-md-h5 ', // medium screen sizes
            'text-sm-h6 ', //small screen size
            'text-subtitle-1', //extra small screen size
            // 'text-body-1'
          ]">
          {{ cardTitle }}
        </h1>
      </VCardTitle>
      <VDivider />
    </VCol>
    <!-- <VCol cols="4">
      <VImg height="10vh" :src="cardImage" v-if="cardImage" />
    </VCol> -->
    <VCol cols="12">
      <!-- <VCardItem>
        <VCardSubtitle v-if="cardSubtitle">
          {{ cardSubtitle }}
        </VCardSubtitle>
      </VCardItem> -->
      <VCardText lines="1" v-if="cardMainText" :class="'text'">
        <h1
          :class="[
            'text-white',
            'text-wrap',
            'text-lg-h6', // large screen sizes
            'text-md-body-1', // medium screen sizes
            'text-sm-body-2', //small screen size
            'text-caption', //extra small screen size
            // 'text-body-1'
          ]">
          {{ cardMainText }}
        </h1>
      </VCardText>
    </VCol>
  </VCol>
</template>
