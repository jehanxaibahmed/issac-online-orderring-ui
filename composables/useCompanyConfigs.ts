import {
  CompanyConfigsObject,
  SocialMedia,
} from "types/allConfigs";

export default function () {
  const runtimeConfig = useRuntimeConfig();
  const apiBase = runtimeConfig.public.apiBase;
  const { displaySnackbar } = useSnackBar();

  const allCompanyConfigs = useState<undefined | CompanyConfigsObject>(
    "companyConfigs",
    () => undefined
  );
// CONFIGS NEED TO BE FETCHED ON INSTANCE AS THEY ALSO WILL APPLY TO THE UNAUTHENTICATED USERS PAGES, NOT TO BE RESET ON SIGNOUT
  async function getCompanyConfigs() {
    try {
      allCompanyConfigs.value = await $fetch<CompanyConfigsObject>(
        `${apiBase}config?v=1`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(allCompanyConfigs.value);
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

  return { getCompanyConfigs, allCompanyConfigs };
}
