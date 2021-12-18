export interface ITransfer {
    _id?: string,
    from: string,
    srcCoin: string,
    srcCurrCurrencyImg: string | null,
    srcAmount: number,
    desCoin: string,
    desCurrCurrencyImg: string | null,
    desAmount: number,
    reciverName: string,
    msg: string
}