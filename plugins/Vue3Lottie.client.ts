import Vue3Lottie from "vue3-lottie";

export default defineNuxtPlugin((nuxtApp) => {
  //@ts-expect-error - this needs fixing nuxt 3.2, ts now says this expects 2 arguments?
  nuxtApp.vueApp.use(Vue3Lottie);
});
