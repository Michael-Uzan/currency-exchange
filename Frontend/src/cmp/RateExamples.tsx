import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CurrencyRateList } from '../cmp/CurrencyRateList'
import { Loading } from '../cmp/Loading'
import { useForm } from '../hooks/useForm'
import IRateProperties from '../interface/IRateProperties.interface'
import { rateService } from '../services/rate.service'
import { RootState } from '../store';
import { getCurrencyRates, setCurrRateImgs } from '../store/actions/currencyRateActions';

export const RateExamples = () => {
    const { currencyRates, srcCurrCurrencyImg, desCurrCurrencyImg } = useSelector((state: RootState) => state.currencyRateModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrencyRates());
    }, [])

    const [currRate, setCurrRate] = useState<any>(null);

    const onRateChange = async (rateProperties: IRateProperties) => {
        const currRate = await rateService.getRate(rateProperties)
        dispatch(setCurrRateImgs(rateProperties))
        setCurrRate(currRate)
    }

    const [rateProperties, handleChange] = useForm({
        srcCoin: 'ILS',
        desCoin: 'PHP',
        amount: 100
    }, onRateChange)

    if (!currRate || !currencyRates || !srcCurrCurrencyImg || !desCurrCurrencyImg) return <Loading />

    const { srcCoin, desCoin, amount } = rateProperties

    return (
        <section className="rates-example ">
            <form className="currency-form">
                <h2>Check out our rates</h2>
                <h3>When you send</h3>
                <div className="flex space-between align-center">
                    <input type="number" min={1} onChange={handleChange} name="amount" value={amount} />
                    <div className="flex align-center">
                        <img className="img-icon" src={srcCurrCurrencyImg} />
                        <select value={srcCoin} onChange={handleChange} name="srcCoin">
                            <CurrencyRateList currencyRates={currencyRates} type={'src'} />
                        </select>
                    </div>
                </div>
                <h3>They'll receive</h3>
                <div className="flex space-between align-center">
                    <div>{amount * currRate}</div>
                    <div className="flex align-center">
                        <img className="img-icon" src={desCurrCurrencyImg} />
                        <select value={desCoin} onChange={handleChange} name="desCoin">
                            <CurrencyRateList currencyRates={currencyRates} type={'des'} />
                        </select>
                    </div>
                </div>
                <button><Link to="/login"> Login to transfer</Link></button>
            </form>
        </section>
    )
}
