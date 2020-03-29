import {AUTH_ERROR, USER_LOADED, USER_LOADING} from "./types";
import {returnErrors} from "./error";
import axios from 'axios';
import {ConfigHeaders} from "../interfaces/ConfigHeaders";

export const loadUser = () => (dispatch: Function, getState: Function) => {
    dispatch({ type: USER_LOADING });

    axios
        .get('/api/user', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })

        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

export const tokenConfig = (getState: Function) => {
    const token = getState().auth.token;
    console.log('token ' + token);

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