import {Msg} from "../types/Msg";
import {User} from "../types/User";
import {RegisteredUser} from "../types/RegisteredUser";

export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserLoaded {
  type: typeof USER_LOADED;
  payload: User
}

export interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: any; // must be RegisteredUser
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

export interface RegisterFail {
  type: typeof REGISTER_FAIL;
  payload: { message: Msg, status: number };
}

export type AuthActionTypes =
  | UserLoading
  | UserLoaded
  | LoginSuccess
  | RegisterSuccess
  | AuthError
  | LoginFail
  | LogoutSuccess
  | RegisterFail;

export type AppActions = AuthActionTypes;