import {Msg} from "../interfaces/Msg";
import {CLEAR_ERRORS, GET_ERRORS} from "./types";

export const returnErrors = (msg: Msg, status: number, id: any = null) => {
  return {
    type: GET_ERRORS,
    payload: {msg, status, id}
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
