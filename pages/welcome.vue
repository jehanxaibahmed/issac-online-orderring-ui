<script setup lang="ts">
import { useDisplay } from "vuetify";
//@ts-expect-error Lottie File
import foodDecidingJSON from "/src/lottie/36895-healthy-or-junk-food.json";
//@ts-expect-error Lottie File
import onlineShopJSON from "/src/lottie/onlineShopCustColorHex000000.json";
//@ts-expect-error Lottie File
import onlineCheckoutJSON from "/src/lottie/onlineCheckoutCustColorHex000000.json";
//@ts-expect-error Lottie File
import foodPaperBagClockJSON from "/src/lottie/onlineFoodBagClockCustColorHex000000.json";
const runtimeConfig = useRuntimeConfig();
const companyEnvBase = runtimeConfig.public;
const { mobile } = useDisplay();
const { height, width, xs } = useDisplay();
const animationTrigger = ref(false);
onMounted(() => {
  animationTrigger.value = true;
});

definePageMeta({
  middleware: "anon", //only auth users can access these pages
  layout: "welcome", //do not show the default layout on this page
});
</script>

<template>
  <V-container>
    <DevelopmentToolsViewportSizeAndBreakpointsHelper
      style="text-align=center" />
    <v-row justify="end">
      <v-col cols="6" md="6">
        <v-carousel :show-arrows="false" hide-delimiter-background>
          <v-carousel-item>
            <v-row justify="center" no-gutters>
              <v-col cols="10" md="12">
                <!-- this is where the card is displaying the text -->
                <WelcomeImageCard
                  :fullscreen="mobile"
                  cardTitle="Want to have a look first?"
                  cardMainText="If you want to see what we have available before signing up then just click above and have a browse! Just start adding items to your basket then just sign up before checking out." />

                <v-row justify="center">
                  <v-col cols="4" md="4" align-self="center">
                    <!-- this is where the lottie animation is being used -->
                    <LottieAnimation
                      :sourceJSON="foodPaperBagClockJSON"
                      v-show="animationTrigger"
                      width="auto" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item>
            <v-row justify="center" no-gutters>
              <v-col cols="10" md="10">
                <WelcomeImageCard
                  cardTitle="Easy to Use"
                  cardMainText="Our ordering process is simple, just sign in, select what date you'd like us to deliver on and start adding items to your basket." />

                <v-row justify="center">
                  <v-col cols="6" md="5" align-self="center">
                    <LottieAnimation
                      :sourceJSON="onlineShopJSON"
                      v-show="animationTrigger"
                      width="auto" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item>
            <v-row justify="center" no-gutters>
              <v-col cols="10" md="10">
                <WelcomeImageCard
                  cardTitle="Pay for your orders Online"
                  cardMainText="We use Stripe as our online payment solution for quick and secure payments. Stripe accepts all major debit and credit cards." />

                <v-row justify="center">
                  <v-col cols="6" md="4" align-self="center">
                    <LottieAnimation
                      :sourceJSON="onlineCheckoutJSON"
                      v-show="animationTrigger"
                      width="auto" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>

          <v-carousel-item>
            <v-row justify="center">
              <v-col cols="5" md="3">
                <LottieAnimation
                  :sourceJSON="foodDecidingJSON"
                  v-show="animationTrigger" />
              </v-col>

              <v-col cols="7" md="12">
                <WelcomePostcodeDeliverRequestCard />
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="6" lg="6">
        <CustomElementsH1 :headerContent="`${companyEnvBase.companyName} `" />
        <CustomElementsH2 :headerContent="`${companyEnvBase.appName} `" />

        <WelcomeAnimatedTagline
          nonAnimatedString="The Best IT Supplier to"
          :animatedStringOptions="[
            'the Foodservice Industry',
            'Better copy needs to be written for these',
            'You!',
            'Suppliers',
            'Chefs',
            'Generic Buzzwords Go Here',
            'Home Cooks',
            'Gordon Ramsey',
          ]"
          :animationSpeed="3500" />

        <AuthSignInForm> </AuthSignInForm>
      </v-col>
    </v-row>
  </V-container>
</template>
