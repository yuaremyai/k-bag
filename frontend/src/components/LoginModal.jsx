import React, { useContext, useState } from "react";
import '../styles/LoginModal.scss';
import { ThemeContext } from "../contexts";
import api from '../httpService';

function LoginPage({modal, setModal, setAuth}){

    const {theme} = useContext(ThemeContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const cl = ['modal']

    if(modal){
        cl.push('active')
    }

    const login = (event) => {
        event.preventDefault()
        api.post('/login', {'email': email, 'password': password}) 
        .then( (response) => {
            localStorage.setItem('token', response.data.token)
            setModal(false)
            setAuth(true)
            })
            .catch( (error) => {
                alert(error.response.data.message)
              });
    }

    const register = (event) => {
        event.preventDefault()
        api.post('/register', {'email': email, 'password': password}) 
        .then( (response) => {
            alert(response.data.message)
            setModal(false)
            })
            .catch( (error) => {
                alert(error.response.data.message)
              });        
    }

    return(
        <div className={cl.join(' ')} onClick={() => setModal(false)}>
            <form className={`log-card ${theme}`} autoComplete="off" onClick={e => e.stopPropagation()}>
                <h2>Log in</h2>
                <div className="mail-block">
                    <label htmlFor="email" className="login-label">Email:</label>
                    <input type="email" id="email" placeholder="Email" className="login-input" value={email} onChange={(e) =>{
                        e.target.value = setEmail(e.target.value)
                    }} required/>
                </div>
                <div className="pass-block">
                    <label htmlFor="pass" className="login-label">Password:</label>
                    <input type="password" id="pass" placeholder="Password" className="login-input" value={password} onChange={(e) =>{
                        e.target.value = setPassword(e.target.value)
                    }} required/>
                </div>
                <div className="status-block" style={{textAlign: "center"}}></div>
                <div className="btn-block">
                    <button className={`btn log-btn ${theme}`} onClick={login}>Log in</button>
                    <button className={`btn reg-btn ${theme}`} onClick={register}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;