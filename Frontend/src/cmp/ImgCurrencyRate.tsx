import { ICurrencyRate } from '../interface/ICurrencyRate'

interface PropType {
    currencyRate: ICurrencyRate
}

export const ImgCurrencyRate = ({ currencyRate }: PropType) => {
    return (
        <section className="img-currency-rate flex align-center space-between">
            {currencyRate.currency} <img className="img-icon" src={currencyRate.img} />
        </section>
    )
}
