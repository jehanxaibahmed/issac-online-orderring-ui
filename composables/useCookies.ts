import { UserSignInApiResponseType } from "types/auth";

export default function () {
  const userActionDisableButtons = useUserActionDisableButtons();
  const dialogShow = useLoadingDialog();
  const runtimeConfig = useRuntimeConfig();
  const apiBase = runtimeConfig.public.apiBase;
  const { displaySnackbar } = useSnackBar();

  const userNeedsToAcceptCookies = useState(
    "userNeedsToAcceptCookies",
    () => false
  );
  //COOKIES DO NOT NEED TO BE RESET ON SIGNOUT AS THEYRE CHECKED BASED ON USER DATA ON SIGNIN, userNeedsToAcceptCookies IS ALWAYS FALSE UNLESS THE COOKIES DIALOG IS ACTIVE (brand new user accounts only)
  async function updateUserPrivacySettings(
    acceptCookies: string,
    email: string,
    sms: string,
    phone: string,
    post: string
  ) {
    try {
      const { userToken, userData } = useAuthComposable();
      userActionDisableButtons.value = true; //disable buttons
      const responseFromApiCall = await $fetch<
        UserSignInApiResponseType["user"]
      >(`${apiBase}auth/?v=1`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          Accept: "application/json",
        },
        body: {
          // privacy_settings: {
          cookies_accept: acceptCookies,
          contact_email: email,
          contact_sms: sms,
          contact_tel: phone,
          contact_post: post,
          // },
        },
      });
      console.log(responseFromApiCall);
      displaySnackbar(
        "Privacy Settings Updated",
        "",
        "success",
        5000,
        "mdi-lock-reset",
        false,
        true
      );
      userData.value = responseFromApiCall;
      localStorage.setItem(
        //user persist
        "userData",
        JSON.stringify(userData.value)
      );
      userActionDisableButtons.value = false;
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

  //put the accept cookies call in here?
  return { userNeedsToAcceptCookies, updateUserPrivacySettings };
}
