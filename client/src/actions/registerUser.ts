import {REGISTER_FAIL, REGISTER_SUCCESS} from "./types";
import {returnErrors} from "./error";
import axios from 'axios';
import {AuthUser} from "../interfaces/AuthUser";

export const register = ({ name, email, password }: AuthUser) => (
    dispatch: Function
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password });

    axios
        .post('/api/register', body, config)
        .then(res =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            );
            dispatch({
                type: REGISTER_FAIL
            });
        });
};
