import {Msg} from "../../types/Msg";
import {User} from "../../types/User";

export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserLoaded {
  type: typeof USER_LOADED;
  payload: User
}

export interface AuthError {
  type: typeof AUTH_ERROR;
  payload: { message: Msg, status: number };
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: User
}

export interface LoginFail {
  type: typeof LOGIN_FAIL;
  payload: { message: Msg, status: number };
}

export interface LogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

export type AuthActionTypes =
  | UserLoading
  | UserLoaded
  | LoginSuccess
  | AuthError
  | LoginFail
  | LogoutSuccess

export type AppActions = AuthActionTypes;