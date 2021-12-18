import { ITransfer } from '../interface/ITransfer'
import { TransferPreview } from './TransferPreview'

interface PropType {
    transfers: ITransfer[],
}

export const TransferList = ({ transfers }: PropType) => {
    return (
        <section className="transfer-list">
            {transfers.map((transfer: ITransfer) => <TransferPreview key={transfer._id} transfer={transfer} />)}
        </section>
    )
}

