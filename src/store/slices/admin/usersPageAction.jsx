import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../../api/CustomFetch'
import { showErrorMessage, showSuccessMessage } from '../../../utils/helpers'

export const getAllUsers = createAsyncThunk(
    'usersCard/getAllUsers',
    async () => {
        try {
            const response = await appFetch({
                url: 'api/admin/users',
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)

export const getUserProfileWithId = createAsyncThunk(
    'userCard/getUserProfileWithId',
    async (id) => {
        try {
            const response = await appFetch({
                url: `api/admin/user/${id}`,
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const toBlockUser = createAsyncThunk(
    'toBlock/toBlockUser',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/blockUser/${id}`,
            })
            dispatch(getUserProfileWithId(id))
            dispatch(getAllUsers())
            showSuccessMessage('Успешно заблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
export const toUnBlockUser = createAsyncThunk(
    'toUnBlock/toUnBlockUser',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/unBlockUser/${id}`,
            })
            dispatch(getUserProfileWithId(id))
            dispatch(getAllUsers())
            showSuccessMessage('Успешно разблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
export const toBlockGift = createAsyncThunk(
    'blockGift/toBlockGift',
    async (obj, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/blockGift/${obj.id}`,
            })
            if (obj.userId) {
                dispatch(getUserProfileWithId(obj.userId))
            }
            dispatch(getAllUsers())
            showSuccessMessage('Успешно заблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
export const toUnBlockGift = createAsyncThunk(
    'unBlockGift/toUnBlockGift',
    async (obj, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/unBlockGift/${obj.id}`,
            })
            if (obj.userId) {
                dispatch(getUserProfileWithId(obj.userId))
            }
            dispatch(getAllUsers())
            showSuccessMessage('Успешно разблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
export const toBlockWish = createAsyncThunk(
    'blockWish/toBlockWish',
    async (obj, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/blockWish/${obj.id}`,
            })
            if (obj.userId) {
                dispatch(getUserProfileWithId(obj.userId))
            } else {
                dispatch(getAllUsers())
            }
            showSuccessMessage('Успешно заблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
export const toUnBlockWish = createAsyncThunk(
    'unBlockWish/toUnBlockWish',
    async (obj, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/unBlockWish/${obj.id}`,
            })
            if (obj.userId) {
                dispatch(getUserProfileWithId(obj.userId))
            } else {
                dispatch(getAllUsers())
            }
            showSuccessMessage('Успешно разблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
