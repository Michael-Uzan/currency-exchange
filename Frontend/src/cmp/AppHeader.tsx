import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const onMenuClick = (): void => {
        setIsMenuOpen(!isMenuOpen)
    }

    const getMenuClass = (): string => {
        return isMenuOpen ? 'menu-open' : ''
    }
    return (
        <header className={`full flex space-between ${getMenuClass()}`}>
            <div className="flex ">
                <img src="https://www.rewire.co.il/wp-content/uploads/2021/02/Purple-logo-1.svg" />
                <nav className="flex">
                    <NavLink onClick={onMenuClick} activeClassName="active" exact to="/" >Home</NavLink>
                    <NavLink onClick={onMenuClick} activeClassName="active" exact to="/rates" >Rates</NavLink>
                    <NavLink onClick={onMenuClick} activeClassName="active" exact to="/dashboard" >Dashboard</NavLink>
                </nav>
            </div>
            <div className="screen" onClick={onMenuClick}></div>
            <button className="btn-menu-toggle" onClick={onMenuClick}>☰</button>
        </header>
    )
}
