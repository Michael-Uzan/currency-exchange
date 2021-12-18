import { useEffect, useState } from 'react'
import { Loading } from '../cmp/Loading';
import { TransferList } from '../cmp/TransferList';
import { transferService } from '../services/transfer.service';

export const History = () => {
    const [transfers, setTransfers] = useState<any>(null);

    useEffect(() => {
        loadTransfers()
    }, [])

    const loadTransfers = async () => {
        const transfers = await transferService.getTransfers()
        setTransfers(transfers)
    }

    if (!transfers) return <Loading />

    return (
        <section className="history ">
            <h1>Last 10 Transfers</h1>
            <TransferList transfers={transfers} />
        </section>
    )
}
