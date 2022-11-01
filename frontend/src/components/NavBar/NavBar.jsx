import React from "react";
import { Link } from "react-router-dom";

import '../../styles/NavBar.scss';
import dark from '../../images/svg/dark.svg';
import light from '../../images/svg/light.svg';

import { useDispatch, useSelector } from 'react-redux'
import { setLight, setDark } from '../../store/themeSlice';
import { setAuthFalse } from "../../store/authSlice";
import { showModal } from "../../store/modalSlice";


import api from '../../httpService';

function NavBar() {

    const isAuth = useSelector(state => state.auth.isAuth) 
    const theme = useSelector(state => state.theme.theme)
    const dispatch = useDispatch()

    const handleClick = () => {
        if (theme === 'light') {
            dispatch(setDark())
        }
        else {
            dispatch(setLight())
        }
    }

    const logout = () => {
        api.get('/logout')
            .then(function (response) {
                localStorage.removeItem('token')
                dispatch(setAuthFalse())
            })
    }

    return (
        <ul className={`nav-bar ${theme}`}>
            <li className={`nav-item brand-title ${theme}`}><Link to="/">K-Bag</Link></li>
            {(theme === 'dark')
                ? <li className="nav-item theme-svg" onClick={handleClick}><img src={dark} alt="" className="theme-chng" /></li>
                : <li className="nav-item theme-svg" onClick={handleClick}><img src={light} alt="" className="theme-chng" /></li>
            }
            <li className={`nav-item cart-btn ${theme}`}><Link to="/cart">Cart</Link></li>
            {isAuth
                ? <li className={`nav-item sign-btn ${theme}`} onClick={logout}>Logout</li>
                : <li className={`nav-item sign-btn ${theme}`}
                    onClick={() => { dispatch(showModal()) }}>Sign in</li>
            }
        </ul>
    )
}

export default NavBar