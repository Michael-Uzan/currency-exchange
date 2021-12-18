import React, { FormEvent, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CurrencyRateList } from '../cmp/CurrencyRateList'
import { Loading } from '../cmp/Loading'
import { RateExamples } from '../cmp/RateExamples';
import { useForm } from '../hooks/useForm'
import { ICurrencyRateState } from '../interface/ICurrencyRateState';
import IRateProperties from '../interface/IRateProperties.interface'
import { ITransfer } from '../interface/ITransfer';
import { eventBusService } from '../services/event-bus.service';
import { httpService } from '../services/http.service';
import { rateService } from '../services/rate.service'
import { transferService } from '../services/transfer.service';
import { RootState } from '../store';
import { getCurrencyRates, setCurrRateImgs } from '../store/actions/currencyRateActions';

export const TransferMoney = () => {
    const { currencyRates, srcCurrCurrencyImg, desCurrCurrencyImg } = useSelector((state: RootState) => state.currencyRateModule)
    const dispatch = useDispatch()
    const loggedInUser: any = useSelector((state: RootState) => state.userModule.loggedInUser)

    useEffect(() => {
        dispatch(getCurrencyRates());
    }, [])

    const [currRate, setCurrRate] = useState<any>(null);

    const onRateChange = async (rateProperties: IRateProperties) => {
        const currRate = await rateService.getRate(rateProperties)
        dispatch(setCurrRateImgs(rateProperties))
        setCurrRate(currRate)
    }

    const [transferProperties, handleChange] = useForm({
        srcCoin: 'ILS',
        desCoin: 'PHP',
        srcAmount: 100,
        reciverName: '',
        msg: ''
    }, onRateChange)

    const onTransfer = async (ev: FormEvent<HTMLFormElement> | null = null) => {
        if (ev) ev.preventDefault();
        try {
            const { srcCoin, desCoin, srcAmount, reciverName, msg } = transferProperties
            const transfer: ITransfer = {
                from: loggedInUser.username,
                srcCoin,
                srcCurrCurrencyImg,
                srcAmount,
                desCoin,
                desCurrCurrencyImg,
                desAmount: srcAmount * currRate,
                reciverName,
                msg
            }
            await transferService.addTransfer(transfer)
            eventBusService.showSuccessMsg('Transfer completed Succesfully')
        } catch (err) {
            eventBusService.showErrorMsg('Sorry cant transfer money!')
            console.log('error: ', err)
        }
    }

    if (!currRate || !currencyRates || !srcCurrCurrencyImg || !desCurrCurrencyImg) return <Loading />

    const { srcCoin, desCoin, srcAmount, reciverName, msg } = transferProperties

    return (
        <section className="transfer-money">
            <form className="currency-form" onSubmit={(ev) => onTransfer(ev)}>
                <h2>Check out our rates</h2>
                <h3>When you send</h3>
                <div className="flex space-between align-center">
                    <input type="number" min={1} onChange={handleChange} name="srcAmount" value={srcAmount} />
                    <div className="flex align-center">
                        <img className="img-icon" src={srcCurrCurrencyImg} />
                        <select value={srcCoin} onChange={handleChange} name="srcCoin">
                            <CurrencyRateList currencyRates={currencyRates} type={'src'} />
                        </select>
                    </div>
                </div>
                <h3>They'll receive</h3>
                <div className="flex space-between align-center">
                    <div>{srcAmount * currRate}</div>
                    <div className="flex align-center">
                        <img className="img-icon" src={desCurrCurrencyImg} />
                        <select value={desCoin} onChange={handleChange} name="desCoin">
                            <CurrencyRateList currencyRates={currencyRates} type={'des'} />
                        </select>
                    </div>
                </div>
                <div >
                    <div className=" reciver-name flex space-between align-center">
                        <label htmlFor="reciverName">Reciver name: </label>
                        <input
                            type="text"
                            name="reciverName"
                            id="reciverName"
                            value={reciverName}
                            placeholder="Reciver Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <textarea name="msg" value={msg} placeholder="Your massage..." onChange={handleChange} required></textarea>
                </div>
                <button>Transfer</button>
            </form>
        </section>
    )
}
