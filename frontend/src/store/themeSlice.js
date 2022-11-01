import { createSlice } from '@reduxjs/toolkit'


const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: (localStorage.theme) ? localStorage.theme : 'dark'
    },
    reducers: {
        setLight(state) {
            state.theme = 'light'
            localStorage.theme = state.theme
        },
        setDark(state) {
            state.theme = 'dark'
            localStorage.theme = state.theme
        }
    }
})

export default themeSlice.reducer
export const { setDark, setLight } = themeSlice.actions
