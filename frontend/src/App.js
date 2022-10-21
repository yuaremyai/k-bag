import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Product from './components/Product/Product'
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar/NavBar';

import './styles/App.scss'
import { ThemeContext } from './contexts';

import api from './httpService'

function App() {

  useEffect(() => {
    if (localStorage.theme === undefined) {
      localStorage.setItem('theme', 'dark')
    }
  }, [])

  const [modal, setModal] = useState(false)
  const [theme, setTheme] = useState(localStorage.theme)
  const [isAuth, setAuth] = useState(false)

  useEffect(() => {
    if (localStorage.token !== undefined && isAuth === false) {
      api.get('/')
        .then((response) => {
          setAuth(true)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            api.get('/refresh')
            .then((response) => {
              localStorage.setItem('token', response.data.token)
              setAuth(true)
            })
            .catch((error) => {
              console.log(error.response)
            })
          }
        })
    }
  }, [isAuth])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.querySelector('body').classList = theme
  }, [theme])

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className='App'>
          <LoginModal modal={modal} setModal={setModal} setAuth={setAuth} />
          <NavBar setModal={setModal} isAuth={isAuth} setAuth={setAuth} />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product' element={<Product />} />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App;
