import { useSelector } from 'react-redux';
import { RateExamples } from '../cmp/RateExamples';
import { TransferMoney } from '../cmp/TransferMoney';
import { RootState } from '../store';

export const Rates = () => {
    const loggedInUser: any = useSelector((state: RootState) => state.userModule.loggedInUser)

    return (
        <section className="rates ">
            <div className="title">
                <h1>Send money home with Rewire</h1>
                <h3>Financial services that make you feel at home</h3>
            </div>
            {!loggedInUser && <RateExamples />}
            {loggedInUser && <TransferMoney />}
        </section >
    )
}
