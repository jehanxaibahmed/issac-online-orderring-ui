import { FilterButtonsType } from "types/enabledFilterOptions";
export default function () {
  //this composable is to handle the switches on the settings page
  const userPrefAlwaysShowNavigationDrawer = useState(
    "userPrefAlwaysShowNavigationDrawer",
    () =>
      localStorage.getItem("alwaysShowNavigationMenus") === "true"
        ? true
        : false
  );

  const userPrefNavigationDrawerExpanded = useState(
    "userPrefNavigationDrawerExpanded",
    () =>
      localStorage.getItem("navigationDrawerExpanded") === "true" ? true : false
  );

  // const enableExpandOnHoverBehaviour = useState("expandOnHover", () =>
  //   localStorage.getItem("expandOnHover") === "true" ? true : false
  // );

  //not applied from the settings page however it is used similarly to the other composables in this file. this composable has since been refactored to accomidate all settings that are stored in local storage, not necessarily just the settings page? if that makes sense, essentially if a user can change a setting and we put it in local storage it belongs in this file
  const userPrefProductsDisplayedPerPage = useState<number | undefined>(
    "userPrefProductsDisplayedPerPage",
    () =>
      localStorage.getItem("productsDisplayedPerPage")
        ? Number(localStorage.getItem("productsDisplayedPerPage"))
        : undefined
  );
  //unsure about resetting this state on signout. these arent to be used in unauthed areas (definetly not for arthur david as they dont have a landing screen just the sign in form) NO POINT IN RESETTING AS THESE ALL LOOK IN LOCAL STORAGE
  const userPrefSortBy = useState<FilterButtonsType | undefined>(
    "userPrefSortyBy",
    () =>
      localStorage.getItem("sortBy")
        ? JSON.parse(localStorage.getItem("sortBy") + "") //+'' for TS
        : undefined
  );
  return {
    userPrefAlwaysShowNavigationDrawer,
    // enableExpandOnHoverBehaviour,
    userPrefProductsDisplayedPerPage,
    userPrefSortBy,
    userPrefNavigationDrawerExpanded,
  };
}
