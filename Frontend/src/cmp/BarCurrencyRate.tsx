import React from 'react'
import { Bar } from 'react-chartjs-2';
import { ICurrencyRate } from '../interface/ICurrencyRate';

interface PropType {
    rates: ICurrencyRate[]
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
        <Bar height={300} width={230} data={getBarData()} options={options} />
    )
}
