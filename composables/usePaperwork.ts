import {
  ArrayOfInvoicedOrders,
  InvoicedOrder,
} from "types/invoicedOrders";
export default function () {
  const runtimeConfig = useRuntimeConfig();
  const userActionDisableButtons = useUserActionDisableButtons();
  const apiBase = runtimeConfig.public.apiBase;
  const { displaySnackbar } = useSnackBar();

  const listOfInvoicedOrders = useState<ArrayOfInvoicedOrders | undefined>(
    "listOfInvoicedOrders",
    () => undefined
  );

  async function copyStatement(
    start: string,
    end: string,
    customerAccNum: string
  ) {
    const { userToken } = useAuthComposable();
    if (!userToken.value) return;
    try {
      userActionDisableButtons.value = true;
      const copied = await $fetch<ArrayOfInvoicedOrders>(
        `${apiBase}paperwork/copy-statement?v=1`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken.value}`,
            Accept: "application/json",
          },
          body: {
            delivery_account_no: customerAccNum,
            start_date: start,
            end_date: end,
          },
        }
      );
      console.log("copied?");
      console.log(copied);
      userActionDisableButtons.value = false;
    } catch (error: any) {
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-food-off",
        false,
        true
      );
      userActionDisableButtons.value = false;
      console.log(error);
    }
  }

  async function copyInvoiceListOrders(accNum: string, date: string) {
    const { userToken } = useAuthComposable();
    if (!userToken.value) return;
    try {
      userActionDisableButtons.value = true;
      listOfInvoicedOrders.value = await $fetch(
        `${apiBase}paperwork/copy-invoice-list-orders/?v=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken.value}`,
            Accept: "application/json",
          },
          query: {
            delivery_account_no: accNum,
            start_date: date,
          },
        }
      );
      console.log(listOfInvoicedOrders.value, "LOOK AT THIS !!!");
      userActionDisableButtons.value = false;
    } catch (error: any) {
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-food-off",
        false,
        true
      );

      userActionDisableButtons.value = false;
    }
  }
  async function copyInvoice(invoiceNum: string) {
    const { userToken } = useAuthComposable();
    if (!userToken.value) return;
    try {
      userActionDisableButtons.value = true;
      const copied = await $fetch(`${apiBase}paperwork/copy-invoice?v=1`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          Accept: "application/json",
        },
        body: {
          delivery_account_no: 14119,
          invoice_no: invoiceNum,
        },
      });
      console.log(copied);
      userActionDisableButtons.value = false;
    } catch (error: any) {
      const errorAfterHandler = apiErrorHandler(error.data, error.status);
      displaySnackbar(
        errorAfterHandler,
        error.status,
        "error",
        5000,
        "mdi-food-off",
        false,
        true
      );

      userActionDisableButtons.value = false;
    }
  }

  function resetPaperworkDataOnSignOut() {
    listOfInvoicedOrders.value = undefined;
  }
  return {
    copyStatement,
    copyInvoice,
    copyInvoiceListOrders,
    resetPaperworkDataOnSignOut,
    listOfInvoicedOrders,
  };
}
