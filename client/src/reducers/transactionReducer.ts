import {
  TRANSACTION_CREATED,
  TRANSACTION_DELETED,
  TRANSACTION_FAIL,
  TRANSACTION_SUCCESS,
  TRANSACTION_UPDATED,
  TransactionActionTypes,
  TRANSACTIONS_RECEIVED
} from "../actions/types/TransactionActionTypes";
import {Transaction} from "../types/Transaction";

const initialState = {
  transactions: []
};

export default (state = initialState, action: TransactionActionTypes) => {
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
        transactions: state.transactions.filter(transaction => action.transaction !== transaction)
      }
    default:
      return state;
  }
}
