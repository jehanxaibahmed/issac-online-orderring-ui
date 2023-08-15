<script setup lang="ts">
//@ts-expect-error Lottie File
import onlineShopJSON from "/src/lottie/onlineShopCustColorHex000000.json";
//@ts-expect-error Lottie File
import onlineCheckoutJSON from "/src/lottie/onlineCheckoutCustColorHex000000.json";
//@ts-expect-error Lottie File
import foodPaperBagClockJSON from "/src/lottie/onlineFoodBagClockCustColorHex000000.json";
import { useDisplay } from "vuetify";
const { xs, sm, md, lg, xl, width } = useDisplay();

const computedMarginForPhoneTrolly = computed(() => {
  // console.log(xs.value, sm.value, md.value, lg.value, xl.value, width.value);
  if (xl) return -10;
  if (lg) return -20;
  if (md) return -33;
  if (xs) return 30;
});

const computedMarginForCreditCardPhoneTrollyApple = computed(() => {
  if (xl) return -17.5;
  if (md) return -25;
});

const paperBagGrocerysClockPhone = computed(() => {
  if (lg) return -20;
  if (md) return -40;
});
</script>

<template>
  <!-- cycle -->
  <VCarousel hide-delimiter-background cycle :show-arrows="false">
    <VCarouselItem>
      <CustomElementsH1 headerContent="Easy To Use" />
      <h3 class="text-h6">
        Our ordering process is simple, just sign in, select what date you'd
        like us to deliver on and start adding items to your basket.
      </h3>
      <LottieAnimation
        :sourceJSON="onlineCheckoutJSON"
        :style="`margin-top:
      ${computedMarginForCreditCardPhoneTrollyApple}%;`" />
    </VCarouselItem>
    <VCarouselItem>
      <CustomElementsH1 headerContent="Pay Online" />
      <h3 class="text-h6">
        We use Stripe as our online payment solution for quick and secure
        payments. Stripe accepts all major debit and credit cards.
      </h3>
      <LottieAnimation
        :sourceJSON="onlineShopJSON"
        :style="`margin-top:
      ${computedMarginForPhoneTrolly}%`" />
    </VCarouselItem>
    <VCarouselItem>
      <CustomElementsH1 headerContent="Look First" />
      <h3 class="text-h6">
        If you want to see what we have available before signing up then just
        click below and have a browse! Just start adding items to your basket
        then just sign up before checking out
      </h3>
      <LottieAnimation
        :sourceJSON="foodPaperBagClockJSON"
        :style="`margin-top:
      ${paperBagGrocerysClockPhone}%`" />
    </VCarouselItem>
  </VCarousel>
</template>

<style></style>
