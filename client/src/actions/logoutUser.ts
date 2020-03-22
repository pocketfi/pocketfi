import {LOGOUT_SUCCESS} from "./types";

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};