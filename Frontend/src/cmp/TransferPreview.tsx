import { ITransfer } from '../interface/ITransfer'

interface PropType {
    transfer: ITransfer
}

export const TransferPreview = ({ transfer }: PropType) => {
    const { from, srcCoin, srcCurrCurrencyImg, srcAmount,
        desCoin, desCurrCurrencyImg, desAmount, reciverName, msg } = transfer
    return (
        <section className="transfer-preview">
            <div className=" flex  align-center">
                <h3>From: {from}  </h3>
                <div className="flex space-between align-center">
                    <h3>Sent: {srcAmount} {srcCoin}</h3>
                    <img src={srcCurrCurrencyImg} className="img-icon" />
                </div>
            </div>
            <div className="flex  align-center">
                <h3>To: {reciverName}</h3>
                <div className="flex space-between align-center">
                    <h3>Recived: {desAmount} {desCoin}</h3>
                    <img src={desCurrCurrencyImg} className="img-icon" />
                </div>
            </div>
            <div className="flex align-center">
                <h3>Massage:</h3>
                <p>{msg}</p>
            </div>
        </section>
    )
}
