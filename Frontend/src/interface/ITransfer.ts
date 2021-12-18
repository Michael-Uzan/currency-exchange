export interface ITransfer {
    _id?: string,
    from: string,
    srcCoin: string,
    srcCurrCurrencyImg: string,
    srcAmount: number,
    desCoin: string,
    desCurrCurrencyImg: string,
    desAmount: number,
    reciverName: string,
    msg: string
}