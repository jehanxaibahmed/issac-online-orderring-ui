import { ofetch } from 'ofetch';
import { useUserStore } from '~/store/user';

export default defineNuxtPlugin((_nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const apiBase = runtimeConfig.public.apiBase;
  globalThis.$fetch = ofetch.create({
    baseURL: apiBase,
    onRequest ({ request, options }) {
      const authStore = useUserStore();
      //Checking if Session
      if (authStore.userToken) {
        options.headers = { Authorization: `Bearer ${authStore.userToken}` }
      }
    },
    onResponse({response, options}){
      console.log(response);
    },
    onResponseError({request, options, response}){
        if (response && response.status) {
        const statusCode = response.status;
        let errorMessage = 'An error occurred';
        
        switch (statusCode) {
          case 500:
            errorMessage = 'Internal Server Error';
            break;
          case 406:
            errorMessage = 'Not Acceptable';
            break;
          case 403:
            errorMessage = 'Forbidden';
            break;
          case 401:
            errorMessage = 'Unauthorized';
            break;
          case 400:
            errorMessage = 'Bad Request';
            break;
          case 200:
            debugger;
            return ;
        }
        console.error(`Request failed with status code ${statusCode}: ${errorMessage}`);
      } else {
        console.error(response);
      }

    }
  })
})