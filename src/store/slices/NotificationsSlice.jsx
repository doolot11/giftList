import { createSlice } from '@reduxjs/toolkit'

import { getAllNotifications } from './NotificationsAction'

const initialState = {
    allNotification: [],
}

const notificationsSlise = createSlice({
    name: 'notification',
    initialState,
    extraReducers: {
        [getAllNotifications.fulfilled]: (state, { payload }) => {
            state.allNotification = payload.reverse()
        },
    },
})
export const notificationsAction = notificationsSlise.actions
export default notificationsSlise
