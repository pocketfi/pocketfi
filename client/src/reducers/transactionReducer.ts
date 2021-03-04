import {
  FOUND_TRANSACTIONS,
  FOUND_TRANSACTIONS_BY_CATEGORY,
  PLACES_RECEIVED,
  REQUEST_ERROR,
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
  transactions: Transaction[]
  foundTransactions: Transaction[] | null
  transactionsFoundByCategory: Transaction[]
  err: any
  places: string[]
}

const initialState = {
  transactions: [],
  foundTransactions: null,
  transactionsFoundByCategory: [],
  err: '',
  places: []
}

export default (state: TransactionReducerState = initialState, action: TransactionActionTypes) => {
  switch (action.type) {
    case TRANSACTION_SUCCESS:
      return {
        ...state
      }
    case TRANSACTION_FAIL:
      return {
        ...state
      }
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
      }
    case FOUND_TRANSACTIONS_BY_CATEGORY:
      return {
        ...state,
        transactionsFoundByCategory: action.transactions,
      }
    case TRANSACTION_MESSAGE:
      return {
        ...state,
        msg: action.msg
      }
    case PLACES_RECEIVED:
      return {
        ...state,
        places: action.places
      }
    case REQUEST_ERROR:
      return {
        ...state,
        err: action.err
      }
    default:
      return state
  }
}
