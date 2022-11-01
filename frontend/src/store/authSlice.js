import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        setAuthFalse(state) {
            state.isAuth = false
        },
        setAuthTrue(state) {
            state.isAuth = true
        }
    }
})

export default authSlice.reducer
export const { setAuthFalse, setAuthTrue } = authSlice.actions
