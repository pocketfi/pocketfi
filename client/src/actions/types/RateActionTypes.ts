import {Rate} from '../../types/Rate'
import {CodeRates} from '../../types/CodeRates'

export const RECEIVE_RATE = 'RECEIVE_RATE'
export const REQUEST_ERROR = 'REQUEST_ERROR'

export interface ReceiveRate {
  type: typeof RECEIVE_RATE,
  rates: Rate[],
  codeRates: CodeRates[]
}

export interface RequestError {
  type: typeof REQUEST_ERROR
}

export type RateActionTypes =
  | ReceiveRate
  | RequestError

export type AppActions = RateActionTypes;
