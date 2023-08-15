//Middleware to be used on pages that ONLY Authenticated users have access too
//We want to check that users are authenticated on all of these pages
//want to check that the authenticated user has access to the specific authenticated page theyre trying to access
//we want this to be in a composable so the logic of building the array of routes they can access only has to happen once instead of being produced everytime they access a page
export default defineNuxtRouteMiddleware((to, from) => {
  const { routesToCheckInMiddleware } = useRoutesAvailableToUserForMiddleware();
  const { userData } = useAuthComposable();

  if (process.server) {
    return; //stop ssr breaking the page
  }

  if (!userData.value) {
    //if a user doesnt have a value (from the useState inside useAuthComposable) they arent authorised to visit the pages with the auth middleware at all, check this first
    return navigateTo("/unauthorised");
  }

  if (routesToCheckInMiddleware.value.includes(to.fullPath)) return; //check this first for non dynamic pages

  //dynamic pages we need to sremove assosiated queries

  //if the auth route the user is trying to access is not in the array of authorised routes navigate them to the authenticated user unauthorised page

  //chatGPT wrote the below regex, explanation:  /(-\d+|-new|\?.+)/ matches either a hyphen followed by one or more digits, the exact word "new", or a question mark followed by any character(s) one or more times (?.+). The captured value can be accessed using the match[1] syntax in the same way as before.
  //10/02 - trailing slash added https://stackoverflow.com/a/31273629
  // const match = to.fullPath.match(/(-\d+|-new|\?.+)/);
  // console.log("this is using const match", match);
  // const removedID = match ? match[1] : undefined;
  // console.log("this should remove the id using const removedID", removedID);
  console.log(to);
  //- HYPHEN = PARAMS
  //? - QUESTION MARK = QUERY
  //TODO:FIXME: REGEX SHOULD ALSO REMOVE THE ? FIX IT AND GET RID OF SPLIT STATEMENT
  const newPath = to.fullPath.replace(/(-\d+|-new|\?.+|\/$)/, "").split("?")[0];
  console.log(
    "%c" + newPath,
    "background-color: fuchsia ; color: white ; font-weight: bold ; ",
    "-- is the path being checked in middleware after regex"
  );

  if (routesToCheckInMiddleware.value.includes(newPath)) return; //TODO: replace these 2 split statements with regex

  //check this first for non dynamic pages

  return navigateTo("/auth/unauthorised");
});
