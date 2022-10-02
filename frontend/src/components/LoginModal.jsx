import React, { useContext, useState } from "react";
import '../styles/LoginModal.scss'
import { ThemeContext } from "../contexts";

function LoginPage({modal, setModal}){
    const {theme} = useContext(ThemeContext)
    const cl = ['modal']

    if(modal){
        cl.push('active')
    }

    return(
        <div className={cl.join(' ')} onClick={() => setModal(false)}>
            <form className={`log-card ${theme}`} autoComplete="off" onClick={e => e.stopPropagation()}>
                <h2>Log in</h2>
                <div className="mail-block">
                    <label htmlFor="email" className="login-label">Email:</label>
                    <input type="email" id="email" placeholder="Email" className="login-input" required/>
                </div>
                <div className="pass-block">
                    <label htmlFor="pass" className="login-label">Password:</label>
                    <input type="password" id="pass" placeholder="Password" className="login-input" required/>
                </div>
                <div className="status-block" style={{textAlign: "center"}}></div>
                <div className="btn-block">
                    <button className={`btn log-btn ${theme}`}>Log in</button>
                    <button className={`btn reg-btn ${theme}`}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;