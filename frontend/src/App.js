import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import Product from './components/Product/Product'
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar/NavBar';

import './styles/App.scss'
import {ThemeContext} from './contexts';

function App() {
  const [modal, setModal] = useState(false)

  if (localStorage.theme === undefined) {
    localStorage.setItem('theme', 'dark')
  }

  const [theme, setTheme] = useState(localStorage.theme)
  
  useEffect( () =>{
    localStorage.setItem('theme', theme)
    document.querySelector('body').classList = theme
  }, [theme])

  return(
    <BrowserRouter>
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className='App'>
              <LoginModal modal={modal} setModal={setModal}/>
              <NavBar isLogged={false} setModal={setModal}/>
                <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/product' element={<Product/>}/>
                </Routes>
              <Footer/>
            </div>
        </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App;
