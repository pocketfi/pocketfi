import {TRANSACTION_FAIL, TRANSACTION_SUCCESS, TransactionActionTypes} from "../actions/types/TransactionActionTypes";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
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
    default:
      return state;
  }
}
