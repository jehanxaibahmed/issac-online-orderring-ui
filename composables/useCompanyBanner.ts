export default function () {
  const displayBannerToUser = useState<boolean>(
    "displayBannerToUser",
    () => false
  );
  const bannerMessage = useState<string>("bannerMessage", () => "");
  async function checkCompanySpecificBanner(message: string) {
    //TODO: replace or use all company configs
    if (!message) return; //if no response (no banner msg) then do nothing
    //if theres a message to be displayed through a banner set displayBannerToUser to true
    displayBannerToUser.value = true;
    //store the v-html string in a useState
    bannerMessage.value = message;
  }
  function resetBannerOnSignOut() {
    displayBannerToUser.value = false;
    bannerMessage.value = "";
  }
  return {
    displayBannerToUser,
    bannerMessage,
    checkCompanySpecificBanner,
    resetBannerOnSignOut,
  };
}
