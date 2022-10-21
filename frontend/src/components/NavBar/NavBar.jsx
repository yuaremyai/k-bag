import React from "react";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../contexts";
import '../../styles/NavBar.scss';
import dark from '../../images/svg/dark.svg';
import light from '../../images/svg/light.svg';
import { Link } from "react-router-dom";

import api from '../../httpService';

function NavBar({ setModal, isAuth, setAuth }) {
    const { theme, setTheme } = useContext(ThemeContext)

    const handleClick = () => {
        if (theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    const logout = () => {
        api.get('/logout')
            .then(function (response) {
                localStorage.removeItem('token')
                setAuth(false)
            })
    }

    return (
        <ul className={`nav-bar ${theme}`}>
            <li className={`nav-item brand-title ${theme}`}><Link to="/">K-Bag</Link></li>
            {(theme === 'dark')
                ? <li className="nav-item theme-svg" onClick={handleClick}><img src={dark} className="theme-chng" /></li>
                : <li className="nav-item theme-svg" onClick={handleClick}><img src={light} className="theme-chng" /></li>
            }
            <li className={`nav-item cart-btn ${theme}`}><Link to="/">Cart</Link></li>
            {isAuth
                ? <li className={`nav-item sign-btn ${theme}`} onClick={logout}>Logout</li>
                : <li className={`nav-item sign-btn ${theme}`}
                    onClick={() => { setModal(true) }}>Sign in</li>
            }
        </ul>
    )
}

export default NavBar