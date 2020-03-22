import {Err} from "./Err";

export interface AuthForm {
    isAuthenticated?: boolean;
    error: Err;
    clearErrors(): void;
}
