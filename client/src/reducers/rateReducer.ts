import {RateActionTypes, RECEIVE_RATE, REQUEST_ERROR} from '../actions/types/RateActionTypes';

const initialState = {
  codeRates: [],
  rates: []
};

export default (state = initialState, action: RateActionTypes) => {
  switch (action.type) {
    case RECEIVE_RATE:
      return {
        ...state,
        rates: action.rates,
        codeRates: action.codeRates
      };
    case REQUEST_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
}
