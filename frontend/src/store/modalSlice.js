import { createSlice } from '@reduxjs/toolkit'


const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modal: false
    },
    reducers: {
        showModal(state) {
            state.modal = true
        },
        hideModal(state) {
            state.modal = false
        }
    }
})

export default modalSlice.reducer
export const { showModal, hideModal } = modalSlice.actions