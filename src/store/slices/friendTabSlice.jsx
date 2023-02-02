import { createSlice } from '@reduxjs/toolkit'

import { getFriendsAction, requestsToFriendAction } from './friendTabAction'

const initialState = { requestToFriend: [], status: null, friends: [] }
export const requestToFriendSlice = createSlice({
    name: 'requestsToFriend',
    initialState,
    reducers: {},
    extraReducers: {
        [requestsToFriendAction.fulfilled]: (state, action) => {
            state.requestToFriend = action.payload
            state.status = 'success'
        },
    },
})
export const requestsToFriendSliceActions = requestToFriendSlice.actions

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: {
        [getFriendsAction.fulfilled]: (state, action) => {
            state.friends = action.payload
            state.status = 'success'
        },
    },
})

export const friendsSliceAction = friendsSlice.actions
