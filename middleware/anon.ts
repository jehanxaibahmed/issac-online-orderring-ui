//Middleware to be used on pages that auth users only should have access too
//If a signed in user is trying to access these pages i.e a user thats already signed in/persisted we dont want them to access pw reset routes or sign in
//redirect them to the index page of the signed in area once built
//because this applies to all pages where a user isnt signed in it will be performant just to check if userData has a value or not instead of setting up specific route checking.

//current auth routes are:
const defaultAuthRoutes = [
  "/",
  "/auth/forgotten-password",
  "/auth/password-reset",
  "/auth/reset-link-sent",
  "/auth/sign-in",
  // "/features",
  // "/information",
];

export default defineNuxtRouteMiddleware((to, from) => {
  const { userData } = useAuthComposable();
  // console.log("anon middleware ran");
  // console.log("userData is", userData.value);
  if (process.server) {
    return; //stop ssr breaking the page
  }
  if (userData.value) {
    //dont want signed in users accessing the log in page
    return navigateTo("/home");
    //want to return to the default signed in page here as if a user is persistant they will be redirected to an unauthorised page if they go to regular url
  }
});
