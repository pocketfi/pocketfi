import {AuthUser} from "./AuthUser";

export interface NavbarApp {
    auth?: {
        isAuthenticated: boolean;
        user: AuthUser;
    };
}
