import {Msg} from "../../types/Msg";
import {Transaction} from "../../types/Transaction";

export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
export const TRANSACTION_FAIL = 'TRANSACTION_FAIL';
export const TRANSACTIONS_RECEIVED = 'TRANSACTIONS_RECEIVED';

export interface TransactionSuccess {
  type: typeof TRANSACTION_SUCCESS;
  payload: Transaction;
}

export interface TransactionFail {
  type: typeof TRANSACTION_FAIL;
  payload: { message: Msg, status: number };
}

export interface TransactionsReceived {
  type: typeof TRANSACTIONS_RECEIVED;
  transactions: Transaction[];
}

export type TransactionActionTypes =
  | TransactionSuccess
  | TransactionFail
  | TransactionsReceived;

export type AppActions = TransactionActionTypes;
