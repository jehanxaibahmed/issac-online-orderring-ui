export default function () {
  const isTheNavigationNavDrawerExpanded = useState(
    "isTheNavigationNavDrawerExpanded",
    () => false
  );
  interface DepGroupCatState {
    text: string;
    filter: {
      parameter_name: string;
      parameter_value: string | number;
    };
  }

  interface AdvertisingCard {
    text: string;
    filter: {
      parameter_name: string;
      parameter_value: string | number;
    };
    image_url: string;
  }

  const passDepGroupCatBetweenAppBarAndBreadcrumb = useState<{
    department: DepGroupCatState | undefined;
    group: DepGroupCatState | undefined;
    category: DepGroupCatState | undefined;
  }>("passDepGroupCatBetweenAppBarAndBreadcrumb", () => {
    return {
      department: undefined,
      group: undefined,
      category: undefined,
    };
  });

  const selectedDepGroupCatFromBreadcrumb = useState<
    DepGroupCatState | undefined
  >("selectedDepGroupCatFromBreadcrumb", () => undefined);

  const openNavigationDrawer = useState("openNavigationDrawer", () => false);

  const advertisingCardData = useState<AdvertisingCard | undefined>(
    "advertisingCardData",
    () => undefined
  );

  //having problems with duplicate product search page requests being made. vue is rendering the product search page before the layout has finished its onBeforeMount logic, so sometimes its sending a product search request from the page and then another one from the layout with a query. This is a temporary fix?
  const loadingStateForProductSearchPage = useState(
    "loadingStateForProductSearchPage",
    () => true
  );

  function resetLayoutToPageStateOnSignout() {
    isTheNavigationNavDrawerExpanded.value = false;
    passDepGroupCatBetweenAppBarAndBreadcrumb.value = {
      department: undefined,
      group: undefined,
      category: undefined,
    };
    selectedDepGroupCatFromBreadcrumb.value = undefined;
    openNavigationDrawer.value = false;
    advertisingCardData.value = undefined;
  }
  return {
    isTheNavigationNavDrawerExpanded,
    passDepGroupCatBetweenAppBarAndBreadcrumb,
    loadingStateForProductSearchPage,
    selectedDepGroupCatFromBreadcrumb,
    advertisingCardData,
    openNavigationDrawer,
    resetLayoutToPageStateOnSignout,
  };
}
