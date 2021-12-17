import React from 'react'
import { ICurrencyRate } from '../interface/ICurrencyRate'

interface PropType {
    currencyRate: ICurrencyRate,
}

export const OptionCurrencyRate = ({ currencyRate }: PropType) => {

    return (
        <option value={currencyRate.currency}>{currencyRate.currency}</option>
    )
}
