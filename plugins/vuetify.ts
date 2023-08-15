import { ReducedToClear } from "../types/productFilters";
// plugins/vuetify.js
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import { aliases, mdi } from "vuetify/lib/iconsets/mdi-svg";

//Color pallet: https://next.vuetifyjs.com/en/styles/colors/

//see useCompanyColorsComposable for logic and defaults
export default defineNuxtPlugin((nuxtApp) => {
  //  const { allCompanyConfigs } = useCompanyConfigs();
  const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
      // ...{
      primary: "#0369a1", //"#336b6f",
      secondary: "#639D61",
      secondarySecondary: "#dfebd9",
      accent: "#7c3aed",
      NextDayDelivery: "#E5ECF2",
      shopFavourites: "#84B36C",
      error: "#FF5252",
      errorOpaque75pc: "#FF5252BF", //+bf = 75% opacity https://davidwalsh.name/hex-opacity
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
      background: "#FFFFFF",
      surface: "#f5f5f4",
      surfaceVariant: "#d6d6d6",
      onSurfaceVariant: "#EEEEEE",
      productTextEmphasis: "#9B3E4E",
      neutral: "#f0eeec",
      alternate: "#4338ca",
      companyPrimary: "#00447e",
      companySecondaryPrimary: "#E5ECF2",
      outlineAlternate: "#DEDEDE",
      favorites: "#E91E63",
      promotions: "#e1ad21",
      newProduct: "#689F38",
      template: "#9333ea",
      footer: "#FF69B4",
      reducedToClear: "#DB0122",
      redOrangeWarningOpaque75pc: "#c73912BF", //+bf = 75% opacity https://davidwalsh.name/hex-opacity
      redOrangeWarning: "#c73912",
      redOrangeWarning2: "#BA3511",
      redOrangeWarning3: "#A72B0C",
      // },
    },
  };

  const myCustomDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
      primary: "#0284c7",
      secondary: "#639D61",
      secondarySecondary: "#dfebd9",
      reducedToClear: "#DB0122",
      accent: "#8b5cf6",
      error: "#FF5252",
      errorOpaque75pc: "#FF5252BF", //+bf = 75% opacity https://davidwalsh.name/hex-opacity
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
      background: "#121212",
      surface: "#212121",
      surfaceVariant: "#585858",
      onSurfaceVariant: "#424242",
      productTextEmphasis: "#9B3E4E",
      neutral: "#262626",
      alternate: "#4338ca",
      companyPrimary: "#00447e",
      companySecondaryPrimary: "#E5ECF2",
      outlineAlternate: "#DEDEDE",
      favorites: "#f87171",
      promotions: "#d4af37",
      newProduct: "#4ade80",
      template: "#c084fc",
      footer: "#e11d48",
      redOrangeWarning: "#c73912",
      redOrangeWarningOpaque75pc: "#c73912BF", //+bf = 75% opacity https://davidwalsh.name/hex-opacity
      redOrangeWarning2: "#BA3511",
      redOrangeWarning3: "#A72B0C",
    },
  };

  const vuetify = createVuetify({
    ssr: false, //this was set to true until 21/03
    components,
    directives,

    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
        myCustomDarkTheme,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
