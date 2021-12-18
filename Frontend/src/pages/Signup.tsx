import { FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux';
import { onSignup } from '../store/actions/userActions';

export const Signup = ({ history }: any) => {

    const dispatch = useDispatch()

    const [credentials, handleChange] = useForm({
        username: '',
        password: '',
        fullname: ''
    })

    const onSignupSubmit = async (ev: FormEvent<HTMLFormElement> | null = null) => {
        if (ev) ev.preventDefault();
        try {
            await dispatch(onSignup(credentials))
            history.push('/rates')
        } catch (err) {
            console.log(err)
        }
    }

    const { username, password, fullname } = credentials;

    return (
        <section className="login-signup flex direction-col align-center">
            <form className="login-signup-form flex direction-col align-center justify-center" onSubmit={(ev) => onSignupSubmit(ev)}>
                <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    autoFocus
                />
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
                <button>Signup</button>
            </form>
            <Link className="to-login-signup" to="/login">Login?</Link>
        </section>
    )
}
