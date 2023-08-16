// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  alias: {},
  modules: ["@kevinmarrec/nuxt-pwa", "@nuxt/devtools", [
    '@pinia/nuxt',
    {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore'],
      ],
    },
  ],
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@nuxtjs/i18n',
      {
        vueI18n: './lang/i18n.config.ts'
      }
    ]
],
piniaPersistedstate: {
  cookieOptions: {
    sameSite: 'strict',
  },
  storage: 'localStorage'
},

plugins: [
  // Other plugins...
  '~/plugins/ofetch.ts',
],

//this can be removed for the sake of speed, the pwa works but workbox is killing performance in development
  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      script: [
        {
          src: "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,ResizeObserver,WebAnimations,Object.fromEntries,Array.prototype.at",
        },
      ],
    },
  },
  hooks: {
    //fix persist loading whitescreen here??
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    public: {
      companyName: process.env.COMPANY_NAME,
      appName: process.env.APP_NAME,
      apiBase: process.env.DEV_API_BASE,
      homeName: process.env.HOME_NAME,
      pusherAppKey: process.env.PUSHER_APP_KEY,
      pusherCluster: process.env.PUSHER_CLUSTER,
      toOrders: process.env.LOG_IN_ORDERS_PAGE,
      enviroment: process.env.NODE_ENV,
      customIcon: process.env.CUSTOM_ICON,
    },
    // routeRules: {
    //   "/": { ssr: false },
    //   // Disables server-side rendering for sections of your app and make them SPA-only with ssr
    // },
  },
  ssr: false, //https://nuxt.com/docs/getting-started/deployment#static-hosting
  pwa: {
    icon: {
      source: `assets/icons/${process.env.CUSTOM_ICON}.png`,
      // sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    workbox: {
      enabled: true,
      //If you want your app to be installable in development, you need to set pwa.workbox.enabled option to true in your nuxt.config, as it's only enabled for production by default
    },
    meta: {
      name: process.env.HOME_NAME,
    },
    manifest: {
      name: process.env.HOME_NAME,
      short_name: process.env.APP_NAME,
      start_url: ".",
      display: "standalone",
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "vue3-lottie/dist/style.css",
    `assets/${process.env.CUSTOM_SCSS}.scss`,
  ],

  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    esbuild: {
      drop:
        process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    },
  },
  typescript: {
    /**
     * !! WARN !!
     * Dangerously allow production builds to successfully complete even if
     * your project has type errors.
     * !! WARN !!
     *
     * This will show us errors on dev, but not stop builds for production
     */
    typeCheck: process.env.NODE_ENV !== "production",
    strict: true,
  },
});
