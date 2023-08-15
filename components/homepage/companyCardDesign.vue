<script setup lang="ts">
import { useDisplay } from "vuetify";
const { userData } = useAuthComposable();
const { smAndUp } = useDisplay();
console.log(userData.value);

const productImagesArray = ref([
  {
    src: "https://images.unsplash.com/photo-1515189703465-7a8ee3f0146c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
  },
  {
    src: " https://images.unsplash.com/photo-1676300185579-ed2b14891d82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    src: "https://images.pexels.com/photos/2072158/pexels-photo-2072158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
]);
</script>

<template>
  <!-- <DevelopmentToolsViewportSizeAndBreakpointsHelper /> -->
  <!-- class="HomeCard" -->
  <VRow justify="center" class="HomeCard">
    <VCol cols="12" sm="12" md="12" xl="12">
      <VCard variant="text">
        <VRow class="mb-4">
          <VCol cols="12" sm="12" md="6" lg="6" v-if="userData">
            <VCardTitle class="text-h5 font-weight-black mt-9">
              Hello <span class="text-primary">{{ userData.username }} </span>
            </VCardTitle>
            <!-- 'pr-2', -->
            <VCardText
              :class="[
                'mt-4 overflow-hidden',
                'text-body-2',
                'text-sm-body-1', //small screen size
              ]">
              <!-- Hot cross buns are a beloved Easter tradition and a delicious
              treat any time of year. These soft, lightly spiced buns are
              studded with raisins or currants and marked with a cross on top,
              traditionally made of icing or pastry. -->
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </VCardText>
            <VCardText class="">
              <LayoutOrderNow />
            </VCardText>
          </VCol>
          <!-- elevation="24" -->
          <VCol sm="12" md="6" lg="6" cols="12" class="">
            <VCarousel
              :hide-delimiters="true"
              show-arrows="hover"
              prev-icon="mdi-arrow-left"
              next-icon="mdi-arrow-right"
              height="340">
              <!-- elevation="10" -->
              <!-- v-for="( productImagesObject  in  productImagesArray )" -->
              <VCard
                class="bg-background align-center"
                elevation="0"
                rounded="xl">
                <VCarouselItem
                  class="bg-background"
                  v-for="(productImagesObject, imageKey) in productImagesArray"
                  :key="imageKey"
                  :src="productImagesObject.src"
                  height="340"
                  cover></VCarouselItem>
              </VCard>
            </VCarousel>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
/* .HomeCard {
  background: url("\img\ui\CompanyCard2.svg") no-repeat;
  object-fit: cover;
} */

/* .HomeCard:before { */
/* width: 1095px;
  height: 430px; */
/* content: "";
  display: inline-block;
  width: 66%;
  height: 430px;
  background-image: url(img/ui/CompanyCard2.svg);
  background-repeat: no-repeat;
  position: absolute;
  left: -30px;
  background-size: 100% 100%; */
/* } */

/* --v-btn-height: 36px; */
</style>
