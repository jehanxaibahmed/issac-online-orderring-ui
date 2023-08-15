import { defineStore } from "pinia";
import { UserSignInApiResponseType } from "types/auth";
import { useSnackbarStore } from "~/store/snackbar";
import { State } from "types/auth/index";


export const useUserStore = defineStore("user", {
  
  state: (): State => {
    return {
    login_screen: {
      email: "",
      password: "",
      showPassword: false,
      emailRules: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v: string) => !!v || "Password is required",
        (v: string) => (v && v.length >= 4) || "Minimum of 4 Characters",
      ],
      showCapsLockWarning: false,
      valid: true,
    },
    userData: undefined,
    userToken: undefined,
  }
  },
  persist:true,
  getters: {},
  actions: {
    async setUser() {},
    logout() {
     
    },
    async loginUser() {
      try {
        const snackbarStore = useSnackbarStore();
        const { dialogShow, userData, userToken, } = useAuthComposable();
        const router = useRouter();
        const userActionDisableButtons = useUserActionDisableButtons();
        const { routesToCheckInMiddleware } =useRoutesAvailableToUserForMiddleware();

        userActionDisableButtons.value = true; //disable buttons
        dialogShow.value = true; //display cute cooking bowl


        const endpoint = "auth/sign-in?v=1";
        const method = "POST";
        const headers = {
          "Content-Type": "application/json"
        };
        const body = {
          email: this.login_screen.email,
          password: this.login_screen.password
        }

        const response = await $fetch<UserSignInApiResponseType>(endpoint, {
          method,
          headers,
          body,
        });



        this.userData = userData.value =response.user;
        this.userToken = userToken.value = response.token;

        localStorage.setItem("userData", JSON.stringify(response.user));
        localStorage.setItem("userToken", JSON.stringify(response.token));
          


        if (response.user.privacy_settings.cookies_accept !== "1") {
          const { userNeedsToAcceptCookies } = useCookies();
          userNeedsToAcceptCookies.value = true;
        }


        routesToCheckInMiddleware.value = response.user
        ? response.user.acl_routes_available
        : [""]; //ts


        snackbarStore.displaySnackbar(
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

        
      } catch (error: any /*TODO:FIXME: ERROR OBJECT TYPE */) {


      }
    },
  },
});
