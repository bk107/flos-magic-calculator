import React from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'

const Nav = (props) => {
    return (
        <div className="nav">

            <NavLink exact to="/" activeClassName="selected">H</NavLink>
            <NavLink to="/viskositaet" activeClassName="selected">V</NavLink>
            <NavLink to="/drehzahl" activeClassName="selected">D</NavLink>
            <NavLink to="/schnittgeschwindigkeit" activeClassName="selected">S</NavLink>

        </div>
    );
}

export default Nav