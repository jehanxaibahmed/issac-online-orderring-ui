<script setup lang="ts">
const props = defineProps({
  //Card Background Colour
  colour: {
    type: String,
    required: true,
  },

  //Image Props
  imageSrc: {
    type: String,
    required: false,
  },

  imageText: {
    type: String,
    required: false,
  },

  //Card Props
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  //Action Props
  actionTo: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <VCard
    class="white--text ADavidCard fill-height mx-auto"
    flat
    :color="colour"
    :to="actionTo ? actionTo : undefined"
    max-width="400">
    <VImg :src="imageSrc" class="white--text align-end" cover>
      <VCardTitle>{{ imageText }}</VCardTitle>
    </VImg>

    <div class="px-4 pb-4 pt-2">
      <VCardTitle class="ADavidCardTitle">{{ title }}</VCardTitle>
      <VCardText class="ADavidCardText">
        {{ description }}
      </VCardText>

    </div>
  </VCard>
</template>
