import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../api/CustomFetch'

export const getAllNotifications = createAsyncThunk(
    'notifications/getAllNotifications',
    async () => {
        try {
            const response = await appFetch({
                url: 'api/notifications',
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const asReadActions = createAsyncThunk(
    'read/asReadActions',
    async (_, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: 'api/notifications/markAsRead',
            })
            dispatch(getAllNotifications())
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
