import {combineReducers} from 'redux';
import authReducer from './authReducer';
import registerReducer from "./registerReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  transaction: transactionReducer
});
