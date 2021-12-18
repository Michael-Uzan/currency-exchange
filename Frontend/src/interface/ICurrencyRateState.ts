import { ICurrencyRate } from "./ICurrencyRate";

export interface ICurrencyRateState {
  currencyRates: ICurrencyRate[],
  srcCurrCurrencyImg: string,
  desCurrCurrencyImg: string,
}