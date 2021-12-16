import React, { useEffect, useState } from 'react'
import { BarCurrencyRate } from '../cmp/BarCurrencyRate';
import { Loading } from '../cmp/Loading';
import { RateService } from '../services/rate.service'

export const Dashboard = () => {

    const [rates, setRates] = useState<any>(null);

    useEffect(() => {
        loadRates()
    }, [])

    const loadRates = async () => {
        const rates = await RateService.getRates()
        setRates(rates)
    }

    if (!rates) return <Loading />

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <BarCurrencyRate rates={rates} />
        </section>
    )
}
