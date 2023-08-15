# Nuxt 3 Vuetify 3 Issac online ordering

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## NWS-CP3-Design Ideas & Spec

Main elements on pages should be big and bold, easy to achieve this aesthetic without complex css.

using Vuetifys grid system, Vcontainers are in the main section of the layouts and unless there is a specific use case for another subcontainer to be used Vcontainers should not be used inside components and pages

## NWS-CP3-Things to keep in mind

### Nuxt 3

Stable as of 16/11/22, error handling and docs still not at 100% though. Should be up to scratch soon.

### Typescript

Use Typescript!

In .vue files:

    <script setup lang="ts">CODE_GOES_HERE</script>

otherwise end files with .ts instead of .js

### Vuetify 3

has been installed, docs still being updated, hopefully done soon.

Check plugins/vuetify.ts

### nuxt/auth

We have writted our own replacement package.
~~not compatable with nuxt 3 but on dev roadmap,going to use a pinia store as alternative. Rudementary auth can be done with composables but overkill to build a robust solution on our own. Once nuxt/auth for nuxt 3 completed look at refactoring if were not to far down the line, do not use store unnecessarily due to this, use comp api.~~

### MDI Icons

~~Icons have been installed as their own package due to there not being a @nuxt/vuetify ?module? available for Nuxt/Vue3 Vuetify3 yet, icons can be accessed using the standard es6 import syntax. https://materialdesignicons.com/~~

Issue with icons resolved following the steps in this starter here: https://github.com/CodyBontecou/nuxt3-and-vuetify

Had to install @mdi/font https://www.npmjs.com/package/@mdi/font, individually, remove the plugin object from the vuetify plugin and update the nuxt config. CANNOT USE THE IMPORT SYNTAX ANYMORE!!!!

This change was made so the backend can give us usable icons simply as strings, not having to have a nasty work around

### Customer Specific SASS Styling/Fonts

From time to time we may have to produce custom styling on a customer basis which is outside of the scope we can customise Vuetify normally. This is the case for custom fonts.

Project  use a custom font in their CP3 application and this is handled by setting an .env variable and adding a scss file into the assets directory along with any relevant files to be used in the file.

    //assets/Project.scss
    @font-face {
    font-family: 'my-custom-font';
    //font being imported from fonts folder inside assets
    src: url('./fonts/museo_sans/MuseoSans_300.otf');
    }

    .v-application {
    	font-family: 'my-custom-font'  !important;
    	[class*='text-'] {
    font-family: 'my-custom-font'  !important;
    }}

    //.env
    CUSTOM_SCSS='Project'

These are accessed and applied on nuxt instace through the nuxt.config.ts in the root of the project.

```
 //nuxt.config.ts
export default defineNuxtConfig({
//...,
css: ["vuetify/lib/styles/main.sass","@mdi/font/css/materialdesignicons.min.css", "vue3-lottie/dist/style.css",assets/${process.env.CUSTOM_SCSS}.scss`]})
```

### Pusher

https://github.com/pusher/pusher-js has been installed to handle our pusher implementation.

currently the idea for the implementation is that pusher will be 'instantiate' pusher on every nuxt instance through a plugin currently 1.pusher.ts (the 1 prefix is so this is first in the directory so nuxt runs this first otherwise the auth plugin crashes due to the persist check using pusher).

This plugin returns this:

<!-- prettier-ignore -->
return { provide: { pusher: pusher } };

This allows us to use the 'provided' [Nuxt 3, automatically-providing-helpers](https://nuxt.com/docs/guide/directory-structure/plugins#automatically-providing-helpers) 'instantiated' pusher application wide.

currently this is being used in our useAuthComposable like so:

we gain access to our 'injected'? pusher 'thing?' like this

` const { $pusher } = useNuxtApp();`

which we can use like this:

` const channel = $pusher.subscribe`

### Disabling Buttons

All buttons in the application that should be disabled when a user makes an action (almost all of them) should access the userActionDisableButtons boolean which is in the composables folder under the same name. Whenever a user has performed an action which requires the disabling of buttons in the application (most commonly this is happening in other composables as of 13/01/23) then the value of this should be changed to true then back to false again once completed. e.g:

<!-- prettier-ignore -->
```

  

async function signInUser() {

  

try {

  

userActionDisableButtons.value = true; //disable buttons

  

//BACKEND SIGN IN CALL

  

userActionDisableButtons.value = false; //enable buttons

  

} catch (error: any ) {

  

userActionDisableButtons.value = false; //enable buttons if request has failed

  

//THOW ERROR

  

}

  

}

  

```

### Utils Folder

The Utils folder is where our 'utility' or 'helper' functions live, these are Auto-Imported by nuxt application wide, for an example look at how the apiErrorHandler is defined in the utils and how its being used in the auth composable, its not being destructured out like with composables are we are able to just call these functions app wide. https://nuxt.com/docs/guide/directory-structure/utils.

### Authentication

After looking into the topic more decided to go for a simple plugin composable auth system:

- the plugin checks local storage to see if a user object is saved locally whenether a new nuxt instance is initiated, if there is, userData > This Data else userData > Undefined

- whenever a user logs in there token and data is stored in local storage

- local storage is cleaned on log out.

This is a better solution than utilising an entire state management system (which doesnt have persistance capiablitiy built in!) just for auth when we hopefully will be stitching to the auth/nuxt package soon anyway

### Development/Production Conditional Functionality

If we want to do something conditionally based on whether we are in production or not we can now access whichever node environment we are in through runtimeConfig.public.enviroment

An example of this is inside of the display snackbar function. is being used in conjunction with a showInProduction flag inside of displaySnackbar, when in production any snackbar with the flag set to false wont be displayed and while we are in our development enviroment all snackbars will be displayed as the runtimeConfig.public.enviroment === 'production' will resolve to false

this logic can be used anywhere we would always want something on for development but always/conditionally off in production

    const runtimeConfig = useRuntimeConfig();
    if (runtimeConfig.public.enviroment === "production" && !showInProduction) {
      return;
    }

### Nuxt 3 PWA

package here https://github.com/kevinmarrec/nuxt-pwa-module

### Lottie Animations

https://airbnb.design/lottie/

https://en.wikipedia.org/wiki/Lottie_(file_format)

https://lottiefiles.com/

https://github.com/LottieFiles/awesome-lottie

Lottie is an open-source animation file format that’s tiny, high quality, scriptable,

interactive, and can be manipulated at runtime

We are using a package called Vue 3 Lottie - https://www.npmjs.com/package/vue3-lottie https://vue3-lottie.vercel.app/guide.html

vue3-lottie is a simple Vue 3 component that allows you to add Lottie animations into Vue applications. This component uses props for data and any config options.

Using the components/lottie/animation.vue component companies custom primary colors can be used inside the animation, change the elements of the animation to be colored to #000000, this can be easily done by editing the animations found on https://lottiefiles.com/ or ?by uploading the lottie animations to the editor on here and changing wanted elements to #000000, if we want to use #000000 in an animation the component can be updated to work with any other desired color. currentl;y this is using a package called lottie-colorify, hopefully this can be removed

Sometimes there are issues with Lotties being unable to utilise the above functionality, as our current understanding there is no way to tell which animations work and which dont, try a section of an animation before spending a serious amount of time editing it.

### v-calendar

https://www.npmjs.com/package/v-calendar

https://vcalendar.io/

v-calendar is what we are using as a stopgap for our calendar needs in anticipation of the vuetify 3.1 release at somepoint in Q1 2023 where vuetify will release the composition api compatiable version of their calendar component, at this point out calendar will be quickly refactored for vuetify and the v-calendar package can be removed from the application

### ~~Pinia~~

State Managment
To Presist State
@pinia-plugin-persistedstate/nuxt


### Snackbars (success/error messages displayed to users)

destructure displaySnackbar out from the useSnackBar composable:

const { displaySnackbar } = useSnackBar();

call with the following parameters:

function displaySnackbar(

message: string,

statusCode: string,

statusColor: string,

timeoutLength: number,

icon: string

restoreButton: boolean,

showInProduction: boolean
)

## Setup

Make sure to install the dependencies:

```bash







# yarn







yarn install









# npm







npm install









# pnpm







pnpm install  --shamefully-hoist







```

## Development Server

Start the development server on http://localhost:3000

```bash







npm run  dev







```

## Production

Build the application for production:

```bash







npm run  build







```

Locally preview production build:

```bash







npm run  preview







```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
