export default function () {
  //anon users can access home, sign in, forgotten password, reset-password (if the token is valid?)
  //authenticated users can access home and routes provided when they log in
  const defaultAuthRoutes = [
    "/",
    "/features",
    "/information",
    "/auth/forgotten-password",
    "/auth/password-reset",
    "/auth/reset-link-sent",
    "/auth/sign-in",
    "/auth/update-user",
  ];
  const routesToCheckInMiddleware = useState(
    //user starts auth
    "routesToCheckInMiddleware",
    () => defaultAuthRoutes
  );

  function resetRoutesOnSignOut() {
    routesToCheckInMiddleware.value = defaultAuthRoutes;
  }

  return { routesToCheckInMiddleware, resetRoutesOnSignOut };
}
