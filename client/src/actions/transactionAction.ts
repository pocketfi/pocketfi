import axios from 'axios';
import {Transaction} from "../types/Transaction";
import {Dispatch} from "redux";
import {
  TRANSACTION_FAIL,
  TRANSACTION_SUCCESS,
  TransactionActionTypes
} from "./types/TransactionActionTypes";
import {Msg} from "../types/Msg";
import {tokenConfig} from "./authActions";
import {AppState} from "../store";

export const transactionSuccess = (transaction: Transaction): TransactionActionTypes => ({
  type: TRANSACTION_SUCCESS,
  payload: transaction,
});

export const transactionFail = (message: Msg, status: number): TransactionActionTypes => ({
  type: TRANSACTION_FAIL,
  payload: {message, status}
});

export const newTransaction = (transaction: Transaction) => (
  dispatch: Dispatch<TransactionActionTypes>, getState: () => AppState
) => {
  console.log(tokenConfig(getState));

  axios
    .post('api/transaction/new', transaction, tokenConfig(getState))
    .then(res => {
        dispatch(transactionSuccess(res.data))
      }
    )
    .catch(err => {
      dispatch(transactionFail(err.response.data, err.response.status));
    });
};