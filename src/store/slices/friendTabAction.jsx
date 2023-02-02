import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../api/CustomFetch'

import { getFriendProfileAction } from './friendProfileAction'

export const requestsToFriendAction = createAsyncThunk(
    'requestToFriend/getRequestToFriendAction',
    async () => {
        try {
            const response = await appFetch({
                url: `api/users/friends/requests`,
            })
            return response
        } catch (error) {
            throw new Error('Что-то пошло не так!')
        }
    }
)

export const getFriendsAction = createAsyncThunk(
    'friends/getAllUsersAction',
    async () => {
        try {
            const response = await appFetch({ url: `api/users/friends` })
            return response
        } catch (error) {
            throw new Error('Что-то пошло не так!')
        }
    }
)

export const acceptRequestToFriend = createAsyncThunk(
    'acceptReques/acceptRequestToFrined',
    async (obj) => {
        const response = await appFetch({
            method: 'POST',
            url: `api/users/friends/accept/${obj.id}`,
        })
        obj.dispatch(requestsToFriendAction())
        return response
    }
)
export const acceptRequestToFriendInnerPage = createAsyncThunk(
    'acceptReques/acceptRequestToFrined',
    async (obj) => {
        const response = await appFetch({
            method: 'POST',
            url: `api/users/friends/accept/${obj.userId}`,
        })
        obj.dispatch(getFriendProfileAction(obj.userId))
        return response
    }
)

export const rejectRequestToFriendAction = createAsyncThunk(
    'rejectRequest/rejectRequestToFriendAction',
    async (obj) => {
        const response = await appFetch({
            method: 'POST',
            url: `api/users/friends/reject/${obj.id}`,
        })
        obj.dispatch(requestsToFriendAction())
        return response
    }
)
export const rejectRequestToFriendActionInnerPage = createAsyncThunk(
    'rejectRequest/rejectRequestToFriendAction',
    async (obj) => {
        const response = await appFetch({
            method: 'POST',
            url: `api/users/friends/reject/${obj.userId}`,
        })
        obj.dispatch(getFriendProfileAction(obj.userId))
        return response
    }
)
