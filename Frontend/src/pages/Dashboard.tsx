import React, { useEffect, useState } from 'react'
import { BarCurrencyRate } from '../cmp/BarCurrencyRate';
import { CurrencyRateList } from '../cmp/CurrencyRateList';
import { Loading } from '../cmp/Loading';
import { rateService } from '../services/rate.service'

export const Dashboard = () => {

    const [rates, setRates] = useState<any>(null);

    useEffect(() => {
        loadRates()
    }, [])

    const loadRates = async () => {
        const rates = await rateService.getRates()
        setRates(rates)
    }

    if (!rates) return <Loading />

    return (
        <section className="dashboard space-between">
            <div className="rate-dollar">
                <h3>Rate of currency to 1$ </h3>
                <BarCurrencyRate rates={rates} />
            </div>
            <div className="supported-coins">
                <h3>Our supported coins</h3>
                <CurrencyRateList currencyRates={rates} type={'img'} />
            </div>
        </section>
    )
}
