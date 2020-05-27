import {AppActions, RECEIVE_RATE} from './types/RateActionTypes';
import {Dispatch} from 'redux';
import {Rate} from '../types/Rate';
import {CodeRates} from '../types/CodeRates';

export const receiveRate = (rates: Rate[], codeRates: CodeRates[]): AppActions => ({
  type: RECEIVE_RATE,
  rates: rates,
  codeRates: codeRates
});

export const fetchRate = () => (dispatch: Dispatch<AppActions>) => {
  let currencyRate: Rate[] = [];
  let codeRates: CodeRates[] = [];
  fetch('https://api.exchangeratesapi.io/latest')
    .then(res => {
      return res.json()
    }).then(data => {
    const rates = JSON.stringify(data.rates);
    JSON.parse(rates, (key: string, value: number) => {
      currencyRate.push({code: key, value: value});
      codeRates.push({value: key, label: key});
    });
  });
  dispatch(receiveRate(currencyRate, codeRates));
};