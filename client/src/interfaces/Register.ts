import {AuthForm} from "./AuthForm";
import {AuthUser} from "./AuthUser";

export interface Register extends AuthForm {
    register(user: AuthUser): void;
}