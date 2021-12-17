import React from 'react'
import { Bar } from 'react-chartjs-2';
import { ICurrencyRate } from '../interface/ICurrencyRate';

interface PropType {
    rates: ICurrencyRate[]
}

export const BarCurrencyRate = ({ rates: currencyRates }: PropType) => {
    currencyRates = currencyRates.filter((currencyRate: ICurrencyRate) => currencyRate.directionType === 'des')
    const getBarData = (): any => {
        return ({
            labels: currencyRates.map(rate => rate.currency),
            datasets: [
                {
                    label: 'Dollar $',
                    data: currencyRates.map(rate => rate.rateToDollar),
                    backgroundColor: [
                        '#321879',
                    ],
                    borderColor: [
                        '#321879',
                    ],
                    borderWidth: 1,
                },
            ],
        })
    }

    const options: any = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: false,
        scales: {
            x: {
                ticks: {
                    stepSize: 0.3
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <Bar height={300} width={230} data={getBarData()} options={options} />
    )
}
