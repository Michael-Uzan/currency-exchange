import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
    return (
        <header className="full flex">
            <img src="https://www.rewire.co.il/wp-content/uploads/2021/02/Purple-logo-1.svg" />
            <nav className="flex justify-center">
                <NavLink activeClassName="active" exact to="/" >Home</NavLink>
                <NavLink activeClassName="active" exact to="/rates" >Rates</NavLink>
            </nav>
        </header>
    )
}
