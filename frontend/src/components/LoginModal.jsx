import React, { useContext, useState } from "react";
import '../styles/LoginModal.scss'
import { ThemeContext } from "../contexts";
import axios from 'axios';

function LoginPage({modal, setModal}){
    const url = process.env.REACT_APP_URL

    const {theme} = useContext(ThemeContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const cl = ['modal']

    if(modal){
        cl.push('active')
    }

    axios.interceptors.request.use(function (config) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        return config;
    })

    const login = (event) => {
        event.preventDefault()

        // let data = {'email': email, 'password': password}
        // const xhttp = new XMLHttpRequest()
        // xhttp.open('POST', `${url}/login`)
        // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        // xhttp.send(JSON.stringify(data))
        // xhttp.onload = function(){
        //     data = JSON.parse(this.response)
        //     localStorage.setItem('token', data.token)
        //     console.log('hi')
        // }
        
        setModal(false)
    }

    const register = (event) => {
        event.preventDefault()

        // Registration request
        
        setModal(false)
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