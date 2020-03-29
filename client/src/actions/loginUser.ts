import axios from 'axios';
import {AuthUser} from "../interfaces/AuthUser";
import {LOGIN_FAIL, LOGIN_SUCCESS} from "./types";
import {returnErrors} from "./error";

export const login = ({ email, password }: AuthUser) => (
    dispatch: Function
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    axios
        .post('/api/auth', body, config)
        .then(res =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
            );
            dispatch({
                type: LOGIN_FAIL
            });
        });
};