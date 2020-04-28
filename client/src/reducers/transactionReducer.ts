import {
  TRANSACTION_FAIL,
  TRANSACTION_SUCCESS,
  TransactionActionTypes,
  TRANSACTIONS_RECEIVED
} from "../actions/types/TransactionActionTypes";

const initialState = {
  transactions: []
};

export default function (state = initialState, action: TransactionActionTypes) {
  switch (action.type) {
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        ...action.payload
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
    default:
      return state;
  }
}
