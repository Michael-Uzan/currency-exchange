import { ImgCurrencyRate } from './ImgCurrencyRate'
import { OptionCurrencyRate } from './OptionCurrencyRate'

export const DynamicCurrencyRate = (props: any) => {

    const DynamicCmp = (props: any) => {
        switch (props.type) {
            case 'src':
            case 'des':
                return <OptionCurrencyRate currencyRate={props.currencyRate} />
            case 'img':
                return <ImgCurrencyRate currencyRate={props.currencyRate} />
            default:
                return props.type
        }
    }

    return (
        <DynamicCmp type={props.type} {...props} />
    )
}
