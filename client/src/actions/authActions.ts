import axios from 'axios';
import {
  AppActions,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USER_LOADING
} from './types/AuthActionTypes';
import {ConfigHeaders} from "../types/ConfigHeaders";
import {Dispatch} from "redux";
import {Msg} from "../types/Msg";
import {User} from "../types/User";
import {AppState} from "../store";
import {RegisteredUser} from "../types/RegisteredUser";
import {GoogleLoginResponse} from "react-google-login";
import {LoginUser} from "../types/LoginUser";

export const userLoading = (): AppActions => ({
  type: USER_LOADING
});

export const userLoaded = (loadedUser: User): AppActions => ({
  type: USER_LOADED,
  payload: loadedUser
});

export const authError = (message: Msg, status: number): AppActions => {
  return {
    type: AUTH_ERROR,
    payload: {message, status}
  }
};

export const loginSuccess = (authUser: User): AppActions => ({
  type: LOGIN_SUCCESS,
  payload: authUser
});

export const loginFail = (message: Msg, status: number): AppActions => ({
  type: LOGIN_FAIL,
  payload: {message, status}
});

export const logoutSuccess = (): AppActions => ({
  type: LOGOUT_SUCCESS
});

export const oauthGoogle = (authResponse: GoogleLoginResponse) => (dispatch: Dispatch<AppActions>) => {
  console.log(authResponse);
  axios.post('http://localhost:5000/api/auth/google', {
    email: authResponse.profileObj.email, firstName: authResponse.profileObj.givenName
  })
    .then(res => {
        console.log(res.data);
        dispatch(loginSuccess(res.data));
      }
    )
    .catch(err => {
      dispatch(loginFail(err.response.data, err.response.status
      ));
    });
};

export const loadUser = () => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  dispatch(userLoading());

  axios
    .get('/api/user', tokenConfig(getState))
    .then(res => {
      dispatch(userLoaded(res.data))
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = ({email, password}: LoginUser) => (
  dispatch: Dispatch<AppActions>
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({email, password});

  axios
    .post('/api/auth', body, config)
    .then(res => {
      console.log(res.data);
      dispatch(loginSuccess(res.data))
    })
    .catch(err => {
      dispatch(loginFail(err.response.data, err.response.status
      ));
    });
};

export const logout = () => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch(logoutSuccess())
};

export const tokenConfig = (getState: () => AppState) => {
  const token = (<RegisteredUser>getState().auth).token;

  const config: ConfigHeaders = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};