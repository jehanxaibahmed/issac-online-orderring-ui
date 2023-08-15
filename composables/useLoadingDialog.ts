export default function dialogShow() {
  return useState<boolean>("dialogShow", () => false);
}
//no need to reset this, maybe refactor this and the other 'single' composables into one file? maybe not

//If we need more complex dialog functionality then we can add it below
// export default function () {
//   const dialogShow = useState<boolean>("dialogShow", () => false);
//   return { dialogShow };
// }
