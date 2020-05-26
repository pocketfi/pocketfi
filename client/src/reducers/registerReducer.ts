import {REGISTER_FAIL, REGISTER_SUCCESS} from "../actions/types/RegisterActionTypes";
import {RegisterActionTypes} from "../actions/types/RegisterActionTypes";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default (state = initialState, action: RegisterActionTypes) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}
