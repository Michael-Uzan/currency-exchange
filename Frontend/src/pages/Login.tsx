import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { connect, useDispatch, useSelector } from 'react-redux';
import { eventBusService } from '../services/event-bus.service';
import { onLogin } from '../store/actions/userActions'

export const Login = ({ history }: any) => {

    const dispatch = useDispatch()

    const [credentials, handleChange] = useForm({
        username: '',
        password: '',
    })

    const onLoginSubmit = async (ev: FormEvent<HTMLFormElement> | null = null) => {
        // MAYBE without try catch
        try {
            if (ev) ev.preventDefault();
            await dispatch(onLogin(credentials))
            history.push('/rates')
        } catch (err) {
            console.log(err)
        }
    }

    const { username, password } = credentials;
    return (
        <section className="login-signup flex direction-col align-center">
            <form className="login-signup-form flex direction-col align-center justify-center" onSubmit={(ev) => onLoginSubmit(ev)}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button>Log in</button>
            </form>
            <Link className="to-login-signup" to="/signup">Sign up?</Link>
            <h3>* For quick login try: </h3>
            <small>
                Username: user <br />
                Password: 1234
            </small>
        </section>
    )
}
