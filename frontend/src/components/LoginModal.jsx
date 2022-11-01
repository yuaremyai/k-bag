import React, { useState } from "react";
import '../styles/LoginModal.scss';
import { useSelector, useDispatch } from 'react-redux'
import { setAuthTrue } from '../store/authSlice'
import { hideModal } from '../store/modalSlice'


import api from '../httpService';

function LoginPage() {

    const modal = useSelector(state => state.modal.modal)
    const theme = useSelector(state => state.theme.theme)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()
        api.post('/login', { 'email': email, 'password': password })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                dispatch(hideModal())
                dispatch(setAuthTrue())
            })
            .catch((error) => {
                alert(error.response.data.message)
            });
    }

    const register = (event) => {
        event.preventDefault()
        api.post('/register', { 'email': email, 'password': password })
            .then((response) => {
                alert(response.data.message)
                dispatch(hideModal())
            })
            .catch((error) => {
                alert(error.response.data.message)
            });
    }
    if (!modal) {
        return (<div />)
    }

    return (
        <div className='modal' onClick={() => dispatch(hideModal())}>
            <form className={`log-card ${theme}`} autoComplete="off" onClick={e => e.stopPropagation()}>
                <h2>Log in</h2>
                <div className="mail-block">
                    <label htmlFor="email" className="login-label">Email:</label>
                    <input type="email" id="email" placeholder="Email" className="login-input" value={email} onChange={(e) => {
                        e.target.value = setEmail(e.target.value)
                    }} required />
                </div>
                <div className="pass-block">
                    <label htmlFor="pass" className="login-label">Password:</label>
                    <input type="password" id="pass" placeholder="Password" className="login-input" value={password} onChange={(e) => {
                        e.target.value = setPassword(e.target.value)
                    }} required />
                </div>
                <div className="status-block" style={{ textAlign: "center" }}></div>
                <div className="btn-block">
                    <button className={`btn log-btn ${theme}`} onClick={login}>Log in</button>
                    <button className={`btn reg-btn ${theme}`} onClick={register}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;