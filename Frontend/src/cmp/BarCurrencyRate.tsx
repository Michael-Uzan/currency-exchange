import React from 'react'
import { Bar } from 'react-chartjs-2';
import { ICurrencyRateToDollar } from '../interface/ICurrencyRateToDollar';

interface PropType {
    rates: ICurrencyRateToDollar[]
}

export const BarCurrencyRate = ({ rates }: PropType) => {
    const getBarData = (): any => {
        return ({
            labels: rates.map(rate => rate.currency),
            datasets: [
                {
                    label: 'Dollar $',
                    data: rates.map(rate => rate.rateToDollar),
                    backgroundColor: [
                        '#45cbb2',
                        '#0079bf'
                    ],
                    borderColor: [
                        '#45cbb2',
                        '#0079bf'
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
        <section className="bar-currency-rate">
            <div>
                <h3>Rate of currency to 1 dollar</h3>
                <Bar height={300} width={200} data={getBarData()} options={options} />
            </div>
        </section>
    )
}
