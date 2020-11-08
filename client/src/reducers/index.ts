import {combineReducers} from 'redux'
import authReducer from './authReducer'
import registerReducer from './registerReducer'
import transactionReducer from './transactionReducer'
import rateReducer from './rateReducer'

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  transaction: transactionReducer,
  rate: rateReducer
})
