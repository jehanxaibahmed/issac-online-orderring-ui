import {
  FilterButtonsType,
  FilterButtonsTypeArray,
} from "types/enabledFilterOptions";

export default function () {
  // const watchThisForSeasonalPromotions = useState<
  //   undefined | FilterButtonsType
  // >("watchThisForSeasonalPromotions", () => undefined);

  const refArrayForPermanentFiltersSetFromOtherLeftNavBarOrAppBar = useState<
    undefined | FilterButtonsType[]
  >(
    "refArrayForPermanentFiltersSetFromOtherLeftNavBarOrAppBar",
    () => undefined
  );
  const disableFavPromoNewEctByIndex = useState(
    //impossible to have have an index of -1
    "disableFavPromoNewEctByIndex",
    () => -1
  );

  const disableSuitableForByIndex = useState(
    //impossible to have have an index of -1
    "disableSuitableForByIndex",
    () => -1
  );

  const passClosedPermFilterToComponent = useState<
    FilterButtonsType | undefined
  >("passClosedPermFilterToComponent", () => undefined);

  const useThisForPagination = useState<number>(
    "useThisForPagination",
    () => 1
  );

  const toggleBooleanToTellPermanantFiltersToReset = useState(
    "toggleBooleanToTellPermanantFiltersToReset",
    () => false
  );

  function resetPageToLayoutStateOnSignout() {
    // watchThisForSeasonalPromotions.value = undefined;
    refArrayForPermanentFiltersSetFromOtherLeftNavBarOrAppBar.value = undefined;
    disableFavPromoNewEctByIndex.value = -1;
    disableSuitableForByIndex.value = -1;
    passClosedPermFilterToComponent.value = undefined;
    useThisForPagination.value = 1;
    toggleBooleanToTellPermanantFiltersToReset.value = false;
  }
  return {
    // watchThisForSeasonalPromotions,
    useThisForPagination,
    toggleBooleanToTellPermanantFiltersToReset,
    refArrayForPermanentFiltersSetFromOtherLeftNavBarOrAppBar,
    disableFavPromoNewEctByIndex,
    disableSuitableForByIndex,
    passClosedPermFilterToComponent,
    resetPageToLayoutStateOnSignout,
  };
}
