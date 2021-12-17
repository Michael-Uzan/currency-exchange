import { ICurrencyRate } from "./ICurrencyRate";

export interface ICurrencyRateState {
  currencyRates: ICurrencyRate[],
  srcCurrCurrencyImg: string | null,
  desCurrCurrencyImg: string | null,
}