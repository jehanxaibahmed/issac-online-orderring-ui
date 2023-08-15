import { UserSignInApiResponseType } from "types/auth";

export interface LoginState {
    email: string,
    password: string,
    showPassword: boolean,
    emailRules : { (v : string): void; } [],
    passwordRules: { (v : string): void; } [],
    showCapsLockWarning: boolean,
    valid: boolean
}


export interface State {
    login_screen: LoginState,
    userData: UserSignInApiResponseType["user"] | undefined,
    userToken: string | undefined
}


