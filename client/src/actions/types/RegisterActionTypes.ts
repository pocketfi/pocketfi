import {Msg} from "../../types/Msg";
import {RegisteredUser} from "../../types/RegisteredUser";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export interface RegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: RegisteredUser;
}

export interface RegisterFail {
  type: typeof REGISTER_FAIL;
  payload: { message: Msg, status: number };
}

export type RegisterActionTypes =
  | RegisterSuccess
  | RegisterFail;

export type AppActions = RegisterActionTypes;
