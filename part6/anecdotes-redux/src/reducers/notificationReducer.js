import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification: (state, action) => action.payload,
        removeNotification: () => null
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer