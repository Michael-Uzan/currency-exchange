import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onLogout } from '../store/actions/userActions';

export const AppHeader = () => {
    const dispatch = useDispatch()
    const loggedInUser: any = useSelector((state: RootState) => state.userModule.loggedInUser)

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const onMenuClick = (): void => {
        setIsMenuOpen(!isMenuOpen)
    }

    const getMenuClass = (): string => {
        return isMenuOpen ? 'menu-open' : ''
    }

    const onLogoutClick = async () => {
        setIsMenuOpen(!isMenuOpen)
        try {
            await dispatch(onLogout())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <header className={`full flex space-between ${getMenuClass()}`}>
            <div className="flex align-center space-around">
                <img src="https://www.rewire.co.il/wp-content/uploads/2021/02/Purple-logo-1.svg" />
                <h3>Hello {loggedInUser ? loggedInUser.username : 'guest'}</h3>
                <nav className="flex">
                    <NavLink onClick={onMenuClick} activeClassName="active" exact to="/" >Home</NavLink>
                    <NavLink onClick={onMenuClick} activeClassName="active" exact to="/rates" >Rates</NavLink>
                    <NavLink onClick={onMenuClick} activeClassName="active" exact to="/history" >History</NavLink>
                    <NavLink onClick={onMenuClick} activeClassName="active" exact to="/dashboard" >Dashboard</NavLink>
                    {!loggedInUser && <NavLink onClick={onMenuClick} activeClassName="active" exact to="/login" >Login</NavLink>}
                    {loggedInUser && <NavLink onClick={onLogoutClick} activeClassName="active" exact to="/" >Logout</NavLink>}
                </nav>
            </div>
            <div className="screen" onClick={onMenuClick}></div>
            <button className="btn-menu-toggle" onClick={onMenuClick}>☰</button>
        </header>
    )
}
