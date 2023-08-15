export default function () {
  //this variable will be a ref, Use state is a ref in Nuxt
  //snackBarShow property is a boolean, it will control
  //when to  display the snackbar
  const snackBarShow = useState<undefined | boolean>(
    "snackBarShow",
    () => undefined
  );

  const snackbarData = useState<
    | undefined
    | {
        message: string;
        statusCode: string;
        statusColor: string;
        timeoutLength: number;
        icon: string;
        restoreButton: boolean;
        showInProduction: boolean;
      }
  >("snackbarData", () => undefined);
  //this is bad?, if a user has persisted the watcher doesnt fire? have to use a mounted and to stop this running everytime a new snackbar is produced have to have a base case
  const snackBarMountedLimiter = useState<number>(
    "snackBarMountedLimiter",
    () => 0
  );
  //string or | number because
  const functionToCallIfRestoreButtonClicked = useState<
    undefined | { function: string; id: string }
  >("functionToCallIfRestoreButtonClicked", () => undefined);

  const arrayOfQueuedSnackbars = useState<
    {
      message: string;
      statusCode: string;
      statusColor: string;
      timeoutLength: number;
      icon: string;
      restoreButton: boolean;
      showInProduction: boolean;
    }[]
  >("arrayOfQueuedSnackbars", () => []);

  function checkTheArrayOfQueuedSnackbars() {
    if (!snackBarShow.value && arrayOfQueuedSnackbars.value.length > 0) {
      const messageToRemove = arrayOfQueuedSnackbars.value.shift(); //get the first value in the array shift mutates array for us https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
      console.log("messageToRemove", messageToRemove);
      setTimeout(() => {
        //think this looks nicer with the timeout preventing the snackbar from being displayed instantly
        displaySnackbar(
          messageToRemove ? messageToRemove.message : "SNACKBAR ERROR",
          messageToRemove ? messageToRemove.statusCode : "SNACKBAR ERROR",
          messageToRemove ? messageToRemove.statusColor : "error",
          messageToRemove ? messageToRemove.timeoutLength : 5000, //default is 5000
          messageToRemove ? messageToRemove.icon : "",
          messageToRemove ? messageToRemove.restoreButton : false,
          messageToRemove ? messageToRemove.showInProduction : false
        );
      }, 100);
      return;
    }
  }

  function displaySnackbar(
    message: string,
    statusCode: string,
    statusColor: string,
    timeoutLength: number,
    icon: string,
    restoreButton: boolean,
    showInProduction: boolean
  ) {
    console.log(
      "displaySnackbar",
      message,
      statusCode,
      statusColor,
      timeoutLength,
      icon,
      restoreButton,
      showInProduction
    );
    const runtimeConfig = useRuntimeConfig();
    if (runtimeConfig.public.enviroment === "production" && !showInProduction) {
      return;
    }
    if (snackBarShow.value) {
      //because vuetifys snackbar component doesnt queue up multiple requests weve had to write our own solution. if the snackBarShow === true then it means a snackbar is already being displayed to the user thus this message should be queued up to be shown once the existing one has either been closed or timedout.
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

      arrayOfQueuedSnackbars.value.push({
        message: message,
        statusCode: statusCode,
        statusColor: statusColor,
        timeoutLength: timeoutLength,
        icon: icon,
        restoreButton: restoreButton,
        showInProduction: showInProduction,
      });
      console.log(arrayOfQueuedSnackbars.value, "arrayOfQueuedSnackbars.value");
      return;
    }
    snackBarShow.value = true;
    snackbarData.value = {
      message: message,
      statusCode: statusCode,
      statusColor: statusColor,
      timeoutLength: timeoutLength,
      icon: icon,
      restoreButton: restoreButton,
      showInProduction: showInProduction,
    };
  }
  //dont want to reset snackbar queue on signout?
  return {
    displaySnackbar,
    checkTheArrayOfQueuedSnackbars,
    snackBarShow,
    snackbarData,
    snackBarMountedLimiter,
    functionToCallIfRestoreButtonClicked,
    arrayOfQueuedSnackbars,
  };
}
