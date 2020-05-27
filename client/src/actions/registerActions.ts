import axios from 'axios';
import {AppActions, REGISTER_FAIL, REGISTER_SUCCESS} from './types/RegisterActionTypes';
import {AuthUser} from '../types/AuthUser';
import {Dispatch} from 'redux';
import {Msg} from '../types/Msg';
import {RegisteredUser} from '../types/RegisteredUser';

export const registerSuccess = (registeredUser: RegisteredUser): AppActions => ({
  type: REGISTER_SUCCESS,
  payload: registeredUser,
});

export const registerFail = (message: Msg, status: number): AppActions => ({
  type: REGISTER_FAIL,
  payload: {message, status}
});

export const register = ({name, email, password}: AuthUser) => (
  dispatch: Dispatch<AppActions>
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({name, email, password});

  axios
    .post('/api/register', body, config)
    .then(res => {
        dispatch(registerSuccess(res.data))
      }
    )
    .catch(err => {
      dispatch(registerFail(err.response.data, err.response.status));
    });
};
