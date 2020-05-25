import {Msg} from "../../types/Msg";
import {Transaction} from "../../types/Transaction";

export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
export const TRANSACTION_FAIL = 'TRANSACTION_FAIL';
export const TRANSACTIONS_RECEIVED = 'TRANSACTIONS_RECEIVED';
export const TRANSACTION_UPDATED = 'TRANSACTION_UPDATED';
export const TRANSACTION_CREATED = 'TRANSACTION_CREATED';
export const TRANSACTION_DELETED = 'TRANSACTION_DELETED';

export interface TransactionSuccess {
  type: typeof TRANSACTION_SUCCESS;
}

export interface TransactionFail {
  type: typeof TRANSACTION_FAIL;
  payload: { message: Msg, status: number };
}

export interface TransactionsReceived {
  type: typeof TRANSACTIONS_RECEIVED;
  transactions: Transaction[];
}

export interface TransactionUpdated {
  type: typeof TRANSACTION_UPDATED;
  transaction: Transaction;
}

export interface TransactionCreated {
  type: typeof TRANSACTION_CREATED;
  transaction: Transaction;
}

export interface TransactionDeleted {
  type: typeof TRANSACTION_DELETED;
  transaction: Transaction;
}

export type TransactionActionTypes =
  | TransactionSuccess
  | TransactionFail
  | TransactionsReceived
  | TransactionUpdated
  | TransactionCreated
  | TransactionDeleted

export type AppActions = TransactionActionTypes;
