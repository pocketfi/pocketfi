import {Msg} from "../../types/Msg";
import {Transaction} from "../../types/Transaction";

export const TRANSACTION_SUCCESS = "TRANSACTION_SUCCESS";
export const TRANSACTION_FAIL = "TRANSACTION_FAIL";

export interface TransactionSuccess {
  type: typeof TRANSACTION_SUCCESS;
  payload: Transaction;
}

export interface TransactionFail {
  type: typeof TRANSACTION_FAIL;
  payload: { message: Msg, status: number };
}

export type TransactionActionTypes =
  | TransactionSuccess
  | TransactionFail;

export type AppActions = TransactionActionTypes;
