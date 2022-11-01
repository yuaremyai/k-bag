import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeSlice from './themeSlice'
import authSlice from './authSlice'
import modalSlice from './modalSlice'

const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authSlice,
    modal: modalSlice
})

export const store = configureStore({
    reducer: rootReducer
})
