import { UserSignInApiResponseType } from "types/auth";

export default function () {
  const router = useRouter();
  const { displaySnackbar } = useSnackBar();
  const { routesToCheckInMiddleware, resetRoutesOnSignOut } =
    useRoutesAvailableToUserForMiddleware();
  const { userNeedsToAcceptCookies } = useCookies();
  const { resetBannerOnSignOut } = useCompanyBanner();
  // const { resetConfigsOnSignOut } = useCompanyConfigs(); CONFIGS NEED TO BE FETCHED ON INSTANCE AS THEY ALSO WILL APPLY TO THE UNAUTHENTICATED USERS PAGES, NOT TO BE RESET ON SIGNOUT
  const { resetFAQOnSignOut } = useFAQ();
  const { resetPaperworkDataOnSignOut } = usePaperwork();
  const { resetLayoutToPageStateOnSignout } = usePassStateFromLayoutToPage();
  const { resetPageToLayoutStateOnSignout } = usePassStateFromPageToLayout();
  const dialogShow = useLoadingDialog();
  const userActionDisableButtons = useUserActionDisableButtons();
  const runtimeConfig = useRuntimeConfig();
  const env = runtimeConfig.public; //access env variables

  const apiBase = runtimeConfig.public.apiBase;

  const userData = useState<undefined | UserSignInApiResponseType["user"]>(
    "userData",
    () => undefined
  );
  const userToken = useState<undefined | string>("userToken", () => undefined); //user signed out initially, want undefined for conditional rendering user signed out initially, want undefined for conditional rendering


  async function checkUserPersist() {
    // console.time("CHECK USER PERSIST");
    //this function can take multiple seconds if there is a large amount of data a user has to fetch from the backend, to prevent a whitescreen(initially) push users to a loading page with the mixing bowl animation 'playing' then push them to the regular signed in home page, if they arent a persisted user return as normal - initial idea didnt work, https://medium.com/@flanker72/nuxt3-complex-solutions-page-loading-indicator-e34b5a86be52 - 16/01/23 after removing the different calls that were here during endpoint testing I have been able to get <1ms speeds for this function even when persisting an a1 111111 user!
    if (userData.value) {
      // console.timeEnd("CHECK USER PERSIST");
      return; //if userDataExists we dont have to do anything? this should be impossible as this function is called on new nuxt instance
    }
    const localStorageUserData = <null | string>(
      localStorage.getItem("userData")
    );
    const localStorageTokenData = <null | string>(
      localStorage.getItem("userToken")
    );

    if (!localStorageUserData || !localStorageTokenData) return;

    userData.value = JSON.parse(localStorageUserData);
    userToken.value = JSON.parse(localStorageTokenData);
    routesToCheckInMiddleware.value = userData.value
      ? userData.value.acl_routes_available
      : [""]; //ts

    if (userData.value?.privacy_settings.cookies_accept !== "1") {
      const { userNeedsToAcceptCookies } = useCookies();
      userNeedsToAcceptCookies.value = true;
    }

    // await handlePusherAuth();
    displaySnackbar(
      `Welcome Back ${userData.value?.username}`,
      "",
      "success",
      5000,
      "mdi-human-greeting",
      false,
      true
    );
    // console.timeEnd("CHECK USER PERSIST");
    return;
    // console.timeEnd("CHECK USER PERSIST");
  }

  async function signInUser(email: string, password: string) {
    try {
      userActionDisableButtons.value = true; //disable buttons
      dialogShow.value = true; //display cute cooking bowl

      const responseFromApiCall = await $fetch<UserSignInApiResponseType>(
        `auth/sign-in?v=1`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: {
            email: email,
            password: password,
          },
        }
      );
      //console.log(responseFromApiCall);
      userData.value = responseFromApiCall.user;
      userToken.value = responseFromApiCall.token;

      localStorage.setItem(
        //user persist
        "userData",
        JSON.stringify(responseFromApiCall.user)
      );
      localStorage.setItem(
        //token persist
        "userToken",
        JSON.stringify(responseFromApiCall.token)
      );
      routesToCheckInMiddleware.value = userData.value.acl_routes_available;
      //console.log(routesToCheckInMiddleware.value);

      console.log(userData.value);
      if (userData.value.privacy_settings.cookies_accept !== "1") {
        const { userNeedsToAcceptCookies } = useCookies();
        userNeedsToAcceptCookies.value = true;
      }

      // await handlePusherAuth();
      displaySnackbar(
        "Signed In Successfully",
        "",
        "success",
        5000,
        "mdi-login-variant",
        false,
        false
      );

      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
      //push them to orders or home screen based on config here === 'true'
      router.push({ path: "/home" });

      return responseFromApiCall;
    } catch (error: any /*TODO:FIXME: ERROR OBJECT TYPE */) {
      const errorAfterHandler = apiErrorHandler(error.data, error.status);

      //incorect password = {"message": "Password Incorrect"}
      //incorect email = {"messages": ["The selected email is invalid."]}
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-email-alert",
        false,
        true
      );
      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
    }
  }

  function signOutUserSameActionsForSuccessAndFaliureOrDummySignOut() {
    try {
      //we still want to sign users out even if the sign out request fails, broken the shared logic down into this function so it can be called in both the try and the catch
      userData.value = undefined;
      userToken.value = undefined;
      // localStorage.clear(); want to persist theme and menu settings for when they log back in
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");

      resetRoutesOnSignOut();
      resetBannerOnSignOut();
      resetFAQOnSignOut();
      resetPaperworkDataOnSignOut();
      resetLayoutToPageStateOnSignout();
      resetPageToLayoutStateOnSignout();
      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
      displaySnackbar(
        "Signed Out Successfully",
        "",
        "success",
        5000,
        "mdi-logout-variant",
        false,
        true
      );
      router.push({ path: "/" });
      return;
    } catch (error) {
      console.log("Error in signout process", error);
    }
  }

  async function signOutUser() {
    try {
      userActionDisableButtons.value = true; //disable buttons
      dialogShow.value = true; //display cute cooking bowl
      await $fetch(`${apiBase}auth/sign-out?v=1`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          Accept: "application/json",
        },
      });
      signOutUserSameActionsForSuccessAndFaliureOrDummySignOut();
    } catch (error: any) {
      //wrong token { "message": "Route [login] not defined."}
      signOutUserSameActionsForSuccessAndFaliureOrDummySignOut();
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-email-alert",
        false,
        true
      );
      //console.log(err);
    }
  }

  async function destroyUser() {
    try {
      userActionDisableButtons.value = true; //disable buttons
      await $fetch(`${apiBase}auth/?v=1`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          Accept: "application/json",
        },
      });
      displaySnackbar(
        "Your Account has been deleted",
        "",
        "success",
        5000,
        "mdi-delete-empty-outline",
        false,
        true
      );
      signOutUserSameActionsForSuccessAndFaliureOrDummySignOut();
    } catch (error: any) {
      //wrong token { "message": "Route [login] not defined."}
      // signOutUserSameActionsForSuccessAndFaliure();
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-email-alert",
        false,
        true
      );
      //console.log(err);
    }
  }

  async function updateUser(username: string) {
    try {
      userActionDisableButtons.value = true; //disable buttons
      dialogShow.value = true; //display cute cooking bowl
      userData.value = await $fetch(`${apiBase}auth/?v=1`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          Accept: "application/json",
        },
        body: {
          username: username,
        },
      });

      localStorage.setItem(
        //user persist
        "userData",
        JSON.stringify(userData.value)
      );

      // return userData.value;

      // need to use UserData to update the vlaue to new value
      // userData.User.username.value = userData.User.username.value;
      displaySnackbar(
        "Account updated",
        "",
        "success",
        5000,
        "mdi-lock-reset",
        false,
        true
      );

      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
      return;
    } catch (error: any) {
      //console.log(err.response._data);
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-timer-alert",
        false,
        true
      );

      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
    }
  }

  async function updateUserPassword(
    password: string,
    passwordConfirmation: string
  ) {
    try {
      userActionDisableButtons.value = true; //disable buttons
      dialogShow.value = true; //display cute cooking bowl
      userData.value = await $fetch(`${apiBase}auth/update-password?v=1`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          Accept: "application/json",
        },
        body: {
          password: password,
          password_confirmation: passwordConfirmation,
        },
      });

      localStorage.setItem(
        //user persist
        "userData",
        JSON.stringify(userData.value)
      );

      // return userData.value;

      // need to use UserData to update the vlaue to new value
      // userData.User.username.value = userData.User.username.value;
      displaySnackbar(
        "Password updated",
        "",
        "success",
        5000,
        "mdi-lock-check-outline",
        false,
        true
      );

      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
      return;
    } catch (error: any) {
      //console.log(err.response._data);
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-timer-alert",
        false,
        true
      );

      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
    }
  }

  async function emailForgottenPasswordLinkUser(email: string) {
    try {
      userActionDisableButtons.value = true; //disable buttons
      dialogShow.value = true; //display cute cooking bowl
      await $fetch(`${apiBase}auth/forgot-password?v=1`, {
        method: "POST",
        body: {
          email: email,
        },
      });
      displaySnackbar(
        "Reset Password link sent",
        "",
        "success",
        5000,
        "mdi-form-textbox-password",
        false,
        true
      );
      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
      router.push({ path: "/auth/reset-link-sent" });
      return;
    } catch (error: any) {
      //Incorrect email {"messages": ["The selected email is invalid."]}
      //LIMITER HIT {"error": "Please wait before retrying."}
      //console.log(err.response._data);
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-lock-question",
        false,
        true
      );
      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
      //console.log(err);
    }
  }

  async function resetForgottenPassword(
    password: string,
    passwordConfirmation: string,
    email: string,
    token: string
  ) {
    try {
      userActionDisableButtons.value = true; //disable buttons
      dialogShow.value = true; //display cute cooking bowl
      const responseFromApiCall = await $fetch(
        `${apiBase}auth/reset-password?v=1`,
        {
          method: "POST",
          body: {
            password: password,
            password_confirmation: passwordConfirmation,
            email: email,
            token: token,
          },
        }
      );
      displaySnackbar(
        "Password Reset",
        "",
        "success",
        5000,
        "mdi-lock-reset",
        false,
        true
      );
      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
      router.push({ path: "/auth/password-reset" });
      return;
    } catch (error: any) {
      //console.log(err.response._data);
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-timer-alert",
        false,
        true
      );

      userActionDisableButtons.value = false;
      dialogShow.value = false; //stop displaying cute cooking bowl
    }
  }

  return {
    userData,
    userToken,
    dialogShow,
    destroyUser,
    updateUser,
    updateUserPassword,
    signInUser,
    signOutUser,
    checkUserPersist,
    emailForgottenPasswordLinkUser,
    resetForgottenPassword,
    signOutUserSameActionsForSuccessAndFaliureOrDummySignOut,
  };
}
