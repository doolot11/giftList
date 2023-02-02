import { createSlice } from '@reduxjs/toolkit'

import { getAllUsers, getUserProfileWithId } from './usersPageAction'

const initialState = {
    users: [],
    userProfile: {},
}

const usersCardSlice = createSlice({
    name: 'usersCard',
    initialState,
    extraReducers: {
        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.users = payload
        },
        [getUserProfileWithId.fulfilled]: (state, { payload }) => {
            state.userProfile = payload
        },
    },
})

export const usersCardAction = usersCardSlice.actions
export default usersCardSlice
