import {
  FOUND_TRANSACTIONS,
  FOUND_TRANSACTIONS_BY_CATEGORY,
  TRANSACTION_CREATED,
  TRANSACTION_DELETED,
  TRANSACTION_FAIL,
  TRANSACTION_MESSAGE,
  TRANSACTION_SUCCESS,
  TRANSACTION_UPDATED,
  TransactionActionTypes,
  TRANSACTIONS_RECEIVED
} from '../actions/types/TransactionActionTypes'
import {Transaction} from '../types/Transaction'

export interface TransactionReducerState {
  transactions: Transaction[],
  foundTransactions: Transaction[],
  transactionsFoundByCategory: Transaction[],
  msg: string
}

const initialState = {
  transactions: [],
  foundTransactions: [],
  transactionsFoundByCategory: [],
  msg: ''
}

export default (state: TransactionReducerState = initialState, action: TransactionActionTypes) => {
  switch (action.type) {
    case TRANSACTION_SUCCESS:
      return {
        ...state
      };
    case TRANSACTION_FAIL:
      return {
        ...state
      };
    case TRANSACTIONS_RECEIVED:
      return {
        ...state,
        transactions: action.transactions
      }
    case TRANSACTION_CREATED:
      return {
        ...state,
        transactions: [...state.transactions, action.transaction]
      }
    case TRANSACTION_UPDATED:
      return {
        ...state,
        transactions: state.transactions.map((transaction: Transaction) =>
          transaction.id === action.transaction.id ? action.transaction : transaction
        )
      }
    case TRANSACTION_DELETED:
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => action.transaction.id !== transaction.id)
      }
    case FOUND_TRANSACTIONS:
      return {
        ...state,
        foundTransactions: action.transactions,
        msg: ''
      }
    case FOUND_TRANSACTIONS_BY_CATEGORY:
      return {
        ...state,
        transactionsFoundByCategory: action.transactions,
        msg: ''
      }
    case TRANSACTION_MESSAGE:
      return {
        ...state,
        msg: action.msg,
        transactionsFoundByCategory: [],
        foundTransactions: [],
      }
    default:
      return state;
  }
}
