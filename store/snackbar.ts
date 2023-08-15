import { defineStore } from 'pinia';

interface SnackbarData {
  message: string;
  statusCode: string;
  statusColor: string;
  timeoutLength: number;
  icon: string;
  restoreButton: boolean;
  showInProduction: boolean;
}

export const useSnackbarStore = defineStore('snackbar', {
  state: (): {
    snackBarShow: boolean | undefined;
    snackbarData: SnackbarData | undefined;
    snackBarMountedLimiter: number;
    functionToCallIfRestoreButtonClicked: {
      function: string;
      id: string;
    } | undefined;
    arrayOfQueuedSnackbars: SnackbarData[];
  } => ({
    snackBarShow: undefined,
    snackbarData: undefined,
    snackBarMountedLimiter: 0,
    functionToCallIfRestoreButtonClicked: undefined,
    arrayOfQueuedSnackbars: [],
  }),
  actions: {
    checkTheArrayOfQueuedSnackbars(): void {
      if (!this.snackBarShow && this.arrayOfQueuedSnackbars.length > 0) {
        const messageToRemove = this.arrayOfQueuedSnackbars.shift();
        setTimeout(() => {
          this.displaySnackbar(
            messageToRemove ? messageToRemove.message : 'SNACKBAR ERROR',
            messageToRemove ? messageToRemove.statusCode : 'SNACKBAR ERROR',
            messageToRemove ? messageToRemove.statusColor : 'error',
            messageToRemove ? messageToRemove.timeoutLength : 5000,
            messageToRemove ? messageToRemove.icon : '',
            messageToRemove ? messageToRemove.restoreButton : false,
            messageToRemove ? messageToRemove.showInProduction : false
          );
        }, 100);
        return;
      }
    },
    displaySnackbar(
      message: string,
      statusCode: string,
      statusColor: string,
      timeoutLength: number,
      icon: string,
      restoreButton: boolean,
      showInProduction: boolean
    ): void {
      const runtimeConfig = useRuntimeConfig();
      if (runtimeConfig.public.enviroment === 'production' && !showInProduction) {
        return;
      }
      if (this.snackBarShow) {
        this.arrayOfQueuedSnackbars.push({
          message,
          statusCode,
          statusColor,
          timeoutLength,
          icon,
          restoreButton,
          showInProduction,
        });
        return;
      }
      this.snackBarShow = true;
      this.snackbarData = {
        message,
        statusCode,
        statusColor,
        timeoutLength,
        icon,
        restoreButton,
        showInProduction,
      };
    },
  },
});
