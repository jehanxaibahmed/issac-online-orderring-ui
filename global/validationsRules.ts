export const emailRules = [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ]
export  const passwordRules = [
    (v: string) => !!v || "Password is required",
    (v: string) => (v && v.length >= 4) || "Minimum of 4 Characters",
  ];