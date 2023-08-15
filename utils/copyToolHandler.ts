export async function copyToClipboard(textWeWantToCopy: string) {
  const permission = await navigator.permissions.query({
    name: "clipboard-write" as PermissionName,
  });
  if (permission.state === "granted") {
    console.log("copied using new method");
    return await navigator.clipboard.writeText(textWeWantToCopy);
  }
  //TODO:FIXME: navigator.clipboard.writeText is not supported over HTTP ONLY HTTPS, refactor or remove this for production
  console.log(permission);
  const textArea = document.createElement("textarea");
  textArea.value = textWeWantToCopy;
  document.body.appendChild(textArea);
  // preventScroll .focus() empty () means it will have the default behavior which is to scroll to the bottom of the page
  // to prevent that we give the focus event an behavior of preventScroll  focus({ preventScroll: true })
  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#preventscroll
  textArea.focus({ preventScroll: true });
  textArea.select();
  try {
    document.execCommand("copy");
    console.log(textWeWantToCopy, "copied");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
}
