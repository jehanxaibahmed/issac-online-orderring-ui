import Pusher from "pusher-js"; //import the package

export default defineNuxtPlugin((nuxtApp) => {
  // console.log("1");
  // const { displaySnackbar } = useSnackBar();
  // const runtimeConfig = useRuntimeConfig(); //to access env variables
  // const env = runtimeConfig.public; //access env variables
  // const { userToken, userData } = useAuthComposable();
  // const pusher = new Pusher(env.pusherAppKey, {
  //   //initialize pusher
  //   cluster: env.pusherCluster,
  //   forceTLS: true,
  //   // encrypted: true,
  //   userAuthentication: {
  //     endpoint: "http://127.0.0.1:8002/broadcasting/auth",
  //     transport: "ajax",
  //     // params: {
  //     //   channel_name: `private-App.Models.Issac.User.${10001334}`,
  //     // },
  //     // headers: {},
  //     // paramsProvider: null,
  //     headersProvider: () => {
  //       const { userToken, userData } = useAuthComposable();
  //       return {
  //         Authorization: `Bearer ${userToken.value}`,
  //         "X-CSRF-Token": userToken.value,
  //       };
  //     },
  //     // customHandler: null,
  //   },
  //   // auth: {
  //   //   headers: {
  //   //     Accept: "application/json",
  //   //     Authorization: `Bearer ${useAuthComposable().userToken.value}`,
  //   //   },
  //   // },
  // });
  // //Pusher.logToConsole = true; //automatically console log TODO:FIXME: DEV ONLY REMOVE FOR PRODUCTION
  // // const channel = pusher.subscribe("test-channel"); //listen on the 'test' (GENERAL) channel
  // // channel.bind("TestEvent", function (data: string) {
  // //   console.log(data);
  // //   displaySnackbar(data, "", "success", 5000, "mdi-lock-reset", false);
  // // });
  // return { provide: { pusher: pusher } };
});
