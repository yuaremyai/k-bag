import React from "react";
import { useContext } from "react";
import {ThemeContext} from "../../contexts";
import '../../styles/NavBar.scss';
import dark from '../../images/svg/dark.svg';
import light from '../../images/svg/light.svg';
import { Link } from "react-router-dom";

function NavBar({isLogged, setModal}){
    const {theme, setTheme} = useContext(ThemeContext)

    return(
        <ul className={`nav-bar ${theme}`}>
            <li className={`nav-item brand-title ${theme}`}><Link to="/">K-Bag</Link></li>
            {(theme === 'dark') 
                ? <li className="nav-item theme-svg" onClick={() => setTheme('light')}><img src={dark} className="theme-chng"/></li>
                : <li className="nav-item theme-svg" onClick={() => setTheme('dark')}><img src={light} className="theme-chng"/></li>
            }
            <li className={`nav-item cart-btn ${theme}`}><a href="#">Cart</a></li>
            {isLogged
                ? <li className={`nav-item sign-btn ${theme}`}><Link to="/">Logout</Link></li>
                : <li className={`nav-item sign-btn ${theme}`} 
                    onClick={()=>{
                        setModal(true)
                }}><Link to="/">Sign in</Link></li>
            }     
        </ul>
    )
}

export default NavBar