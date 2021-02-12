import {Msg} from '../../types/Msg'
import {Transaction} from '../../types/Transaction'

export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS'
export const TRANSACTION_FAIL = 'TRANSACTION_FAIL'
export const TRANSACTIONS_RECEIVED = 'TRANSACTIONS_RECEIVED'
export const TRANSACTION_UPDATED = 'TRANSACTION_UPDATED'
export const TRANSACTION_CREATED = 'TRANSACTION_CREATED'
export const TRANSACTION_DELETED = 'TRANSACTION_DELETED'
export const FOUND_TRANSACTIONS = 'FOUND_TRANSACTIONS'
export const FOUND_TRANSACTIONS_BY_CATEGORY = 'FOUND_TRANSACTIONS_BY_CATEGORY'
export const TRANSACTION_MESSAGE = 'TRANSACTION_MESSAGE'
export const CATEGORY_MESSAGE = 'CATEGORY_MESSAGE'
export const PLACES_RECEIVED = 'PLACES_RECEIVED'
export const REQUEST_ERROR = 'REQUEST_ERROR'

export interface TransactionSuccess {
  type: typeof TRANSACTION_SUCCESS;
  transaction: Transaction;
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

export interface FoundTransactions {
  type: typeof FOUND_TRANSACTIONS;
  transactions: Transaction[] | null;
}

export interface FoundByCategoryTransactions {
  type: typeof FOUND_TRANSACTIONS_BY_CATEGORY;
  transactions: Transaction[];
}

export interface TransactionMessage {
  type: typeof TRANSACTION_MESSAGE;
  msg: string;
}

export interface CategoryMessage {
  type: typeof CATEGORY_MESSAGE;
  msg: string;
}

export interface PlacesReceived {
  type: typeof PLACES_RECEIVED;
  places: string[];
}

export interface RequestError {
  type: typeof REQUEST_ERROR
  err: any
}

export type TransactionActionTypes =
  | TransactionSuccess
  | TransactionFail
  | TransactionsReceived
  | TransactionUpdated
  | TransactionCreated
  | TransactionDeleted
  | FoundTransactions
  | FoundByCategoryTransactions
  | TransactionMessage
  | CategoryMessage
  | PlacesReceived
  | RequestError


export type AppActions = TransactionActionTypes;
