import React from 'react'
import { ICurrencyRate } from '../interface/ICurrencyRate'
import { DynamicCurrencyRate } from './DynamicCurrencyRate'
// import IPokemon from '../interface/IRate.interface'
// import { PokemonPreview } from './PokemonPreview'

interface PropType {
    currencyRates: ICurrencyRate[],
    type: string,
}

export const CurrencyRateList = ({ currencyRates, type }: PropType) => {

    if (type === 'src' || type === 'des') currencyRates = currencyRates.filter(currencyRate => currencyRate.directionType === type)

    return (
        <>
            {currencyRates.map((currencyRate: ICurrencyRate) =>
                (<DynamicCurrencyRate key={currencyRate._id} currencyRate={currencyRate} type={type} />))}
        </>
    )
}
