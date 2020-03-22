import {Msg} from "./Msg";
import {E_ERROR} from "../enums/userErr";

export interface Err {
    id: E_ERROR;
    msg: Msg;
}