export default defineNuxtPlugin(async () => {
  if (process.server) {
    //stops the plugin running server side, which crashes as localStorage doesnt exist server side
    return;
  }
  const { checkUserPersist } = useAuthComposable();
  await checkUserPersist();
});
