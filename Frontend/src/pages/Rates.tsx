import React, { useState } from 'react'
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

    if (!currRate) return <Loading />

    const { srcCoin, desCoin, amount } = rateProperties

    return (
        <section className="rates">
            <form className="currency-form">
                <h2>Check out our rates</h2>
                <h3>When you send</h3>
                <div className="flex space-between">
                    <input type="number" min={1} onChange={handleChange} name="amount" value={amount} />
                    <select value={srcCoin} onChange={handleChange} name="srcCoin">
                        <option value="ILS"> ILS </option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <h3>They'll receive</h3>
                <div className="flex space-between">
                    <div>{amount * currRate}</div>
                    <select value={desCoin} onChange={handleChange} name="desCoin">
                        <option value="PHP">PHP</option>
                        <option value="NPR">NPR</option>
                    </select>
                </div>
            </form>
        </section>
    )
}
