export interface ICurrencyRate {
    _id: string,
    currency: string,
    rateToDollar: number,
    dollarToCurrency: number,
    directionType: string,
    img: string
}