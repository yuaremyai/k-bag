import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Product from './components/Product/Product'
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar/NavBar';
import Cart from './components/Cart';

import './styles/App.scss'

import api from './httpService'

import { useSelector, useDispatch } from 'react-redux'
import { setAuthTrue } from './store/authSlice'

function App() {

  const isAuth = useSelector(state => state.auth.isAuth) 
  const theme = useSelector(state => state.theme.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.querySelector('body').classList = theme
  }, [theme])

  const refreshToken = () => {
    api.get('/refresh')
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        dispatch(setAuthTrue())
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  useEffect(() => {
    if (localStorage.token !== undefined && isAuth === false) {
      api.get('/')
        .then((response) => {
          dispatch(setAuthTrue())
        })
        .catch((error) => {
          if (error.response.status === 401) {
            refreshToken()
          }
        })
    }
  }, [isAuth])

  return (
    <BrowserRouter>
      <div className='App'>
        <LoginModal />
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart refreshToken={refreshToken} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
