import {Err} from "./Err";

export interface AuthProps {
    auth: { isAuthenticated: boolean };
    error: Err;
}