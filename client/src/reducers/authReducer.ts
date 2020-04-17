import {
  AUTH_ERROR,
  AuthActionTypes, LOGIN_FAIL,
  LOGIN_SUCCESS, LOGOUT_SUCCESS,
  USER_LOADED,
  USER_LOADING
} from "../actions/types/AuthActionTypes";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null
};

export default function (state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    case LOGOUT_SUCCESS:
    default:
      return state;
  }
}
