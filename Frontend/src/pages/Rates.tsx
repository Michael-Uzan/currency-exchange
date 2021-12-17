import React, { useEffect, useState } from 'react'
import { CurrencyRateList } from '../cmp/CurrencyRateList'
import { Loading } from '../cmp/Loading'
import { useForm } from '../hooks/useForm'
import IRateProperties from '../interface/IRateProperties.interface'
import { RateService } from '../services/rate.service'
export const Rates = () => {

    const [currRate, setCurrRate] = useState<any>(null);

    const onRateChange = async (rateProperties: IRateProperties) => {
        const currRate = await RateService.getRate(rateProperties)
        setCurrRate(currRate)
    }

    const [rateProperties, handleChange] = useForm({
        srcCoin: 'ILS',
        desCoin: 'PHP',
        amount: 100
    }, onRateChange)


    // 
    const [rates, setRates] = useState<any>(null);

    const loadRates = async () => {
        const rates = await RateService.getRates()
        setRates(rates)
    }

    useEffect(() => {
        loadRates()
    }, [])

    // 



    if (!currRate || !rates) return <Loading />
    const { srcCoin, desCoin, amount } = rateProperties

    return (
        <section className="rates">
            <form className="currency-form">
                <h2>Check out our rates</h2>
                <h3>When you send</h3>
                <div className="flex space-between">
                    <input type="number" min={1} onChange={handleChange} name="amount" value={amount} />
                    <select value={srcCoin} onChange={handleChange} name="srcCoin">
                        <CurrencyRateList currencyRates={rates} type={'src'} />
                    </select>
                </div>
                <h3>They'll receive</h3>
                <div className="flex space-between">
                    <div>{amount * currRate}</div>
                    <select value={desCoin} onChange={handleChange} name="desCoin">
                        <CurrencyRateList currencyRates={rates} type={'des'} />
                    </select>
                </div>
            </form>
        </section>
    )
}
