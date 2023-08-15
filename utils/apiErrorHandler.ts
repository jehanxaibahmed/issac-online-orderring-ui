interface Message {
  message: string;
}
interface Error {
  error: string;
}
interface MessagesArr {
  messages: string[];
}

//function to convert the different ways the back end sends error messages to us into a usable string, ts hates this function, currently we are aware of 3 different ways the back end is sending us 'error' messages, all of them as json, the key value pairs as message, error or messages. messages is an array.
export function apiErrorHandler(response: any, status: number) {
  const { userData, signOutUserSameActionsForSuccessAndFaliureOrDummySignOut } =
    useAuthComposable();
  //this logic is correct? but not behaving as expected, this doesnt run properly on application render
  if (
    status === 503 ||
    status === 429 /*handle a user getting rate limited? */
  ) {
    console.log("503 hit");
    setTimeout(() => {
      //TODO:FIXME: remove this from a set time out
      //janky but it works, this nav gets lost if it happens during the rest of the plugin setup stuff

      //0606 - when we recieved a 503 response from the BE we were stuck in the loading state, to resolve this if the be is in maintenance mode were going to ensure proper behaviour by signing our users out and removing the concept of the authed maintenace page entirely, if 503 > dummy sign out (delete token and data) > display maintenance page, this way if a user sends a sign in request and it 503s they just get pushed back to the maintenace page instead of potentially dangerously being allowed to stay authed???

      signOutUserSameActionsForSuccessAndFaliureOrDummySignOut();

      // if (!userData.value)
      return navigateTo("/maintenance");
      // return navigateTo("/auth/maintenance");
    }, 100);
  }
  if (status === 401) {
    console.log("401 hit");
    //can only hit a 401 error from an 'Authed'state aha you cant, you also get a 401 if you input the wrong password? 401 is the Unauthorized response
    signOutUserSameActionsForSuccessAndFaliureOrDummySignOut();
    //aha okay - so if we send the actual sign out request when we recieve a 401 we get another 401 back as our response so that caused an infinite loop.
  }
  if (!response) {
    return "No Error Message Found, please check your internet connection";
  }
  // console.log(response);
  if (response.message) {
    return response.message;
  }
  if (response.error) {
    return response.error;
  }
  if (response.messages[0]) {
    return response.messages[0];
  }
  //if unhandled we still want the response
  return response;
}
//TODO:FIXME: THIS WILL MORE THAN LIKELY BE CHANGING, PLEASE EXCUSE THE JANK
//Everything in here is a different error code i have come accross while adding the function to
