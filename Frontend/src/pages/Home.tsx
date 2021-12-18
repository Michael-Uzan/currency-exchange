import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const Home = () => {
    const loggedInUser: any = useSelector((state: RootState) => state.userModule.loggedInUser)

    return (
        <section className="home flex align-center direction-col">
            <div className="container">
                <img src="https://www.rewire.co.il/wp-content/uploads/2019/10/Group-3.png" />
                <h1>The easiest way to send money home</h1>
                <p>Rewire helps you give your loved ones more –
                    more cash and more convenience. We’re fast and secure,
                    with great rates and transfers arriving within one business day.
                    Simply choose the transfer type that suits you best: online bank transfer,
                    cash, post office… Whatever your needs, we’ve got you covered.</p>
                {!loggedInUser && <button><Link to="/login"> Login to transfer</Link></button>}
                {loggedInUser && <button><Link to="/rates"> Get started</Link></button>}
            </div>
        </section>
    )
}
