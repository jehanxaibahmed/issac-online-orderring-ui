//typescript file converted from  JSON to typescript
import { FaqTypesMainObject } from "types/faq";

export default function () {
  const runtimeConfig = useRuntimeConfig();
  const apiBase = runtimeConfig.public.apiBase;
  const { displaySnackbar } = useSnackBar();
  const dialogShow = useLoadingDialog();
  const userActionDisableButtons = useUserActionDisableButtons();

  const allFAQ = useState<undefined | FaqTypesMainObject>(
    "allFAQ",
    () => undefined
  );

  async function getFAQ() {
    try {
      const { userToken, userData } = useAuthComposable();
      //   userActionDisableButtons.value = true; //disable buttons
      //   dialogShow.value = true; //display cute cooking bowl
      allFAQ.value = await $fetch<FaqTypesMainObject>(`${apiBase}faq?v=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          Accept: "application/json",
        },
      });
      console.log(allFAQ.value);
    } catch (error: any) {
      console.log(error);
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
      //THIS IS THE FIRST API CALL TO RUN so handle if the be is down for maintenance here
      if (error.status === 503) {
        const { userData } = useAuthComposable();
        if (!userData.value) return navigateTo("/maintenance");
        return navigateTo("/auth/maintenance");
      }
      //console.log(err);
    }
  }
  function resetFAQOnSignOut() {
    allFAQ.value = undefined;
  }
  return { resetFAQOnSignOut, getFAQ, allFAQ };
}
