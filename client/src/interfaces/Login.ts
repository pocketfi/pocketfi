import {AuthForm} from "./AuthForm";
import {AuthUser} from "./AuthUser";

export interface Login extends AuthForm {
    login(user: AuthUser): void;
}
