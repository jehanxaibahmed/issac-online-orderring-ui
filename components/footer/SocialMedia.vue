<script setup lang="ts">
const router = useRouter();
const route = useRoute();
// CompanyConfigsObject
const { allCompanyConfigs } = useCompanyConfigs();

console.log(allCompanyConfigs.value, "HERE");
</script>

<template>
  <!-- how we pass the value from the composable in an href link first of all we don't use to: because the 
link will not work and also using to is only use to point to locations in the application no outside sources
:href="dummyAllCompConfigs?.socialMedia.social_twitter", we use : 
as we use v-bind on href so we can pass the composable data  
refs don't need .value
hence we don't need dummyAllCompConfigs.value after this although its a ref dummyAllCompConfigs   -->
  <!-- :href="allCompanyConfigs.socialmed"  -->
  <!-- https://mathiasbynens.github.io/rel-noopener/  rel="external noopener noreferrer"-->

  <VBtn
    icon="mdi-twitter"
    x-small
    target="_blank"
    rel="external noopener
  noreferrer"
    variant="text"
    class="mx-1"
    :href="allCompanyConfigs?.general.company.social_media.twitter.link" />

  <VBtn
    icon="mdi-facebook"
    target="_blank"
    rel="external noopener noreferrer"
    x-small
    variant="text"
    class="mx-1"
    :href="allCompanyConfigs?.general.company.social_media.facebook.link" />
  <!-- variant="text" if we ever want to remove a background from a button we use this variant  -->

  <VBtn
    icon="mdi-instagram"
    target="_blank"
    rel="external noopener noreferrer"
    x-small
    variant="text"
    class="mx-1"
    :href="allCompanyConfigs?.general.company.social_media.instagram.link" />

  <VBtn
    icon="mdi-linkedin"
    target="_blank"
    rel="external noopener noreferrer"
    x-small
    variant="text"
    class="mx-1"
    :href="allCompanyConfigs?.general.company.social_media.linkedin.link" />

  <VBtn
    icon="mdi-youtube"
    target="_blank"
    rel="external noopener noreferrer"
    x-small
    variant="text"
    class="mx-1"
    :href="allCompanyConfigs?.general.company.social_media.youtube.link" />
</template>
<!-- :href="dummyAllCompConfigs?.socialMedia.social_instagram" -->
<!-- :href="dummyAllCompConfigs?.socialMedia.social_facebook" -->
<!-- :href="dummyAllCompConfigs?.socialMedia.social_twitter" -->
