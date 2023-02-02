import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../../api/CustomFetch'
import { showErrorMessage, showSuccessMessage } from '../../../utils/helpers'

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        try {
            const response = await appFetch({
                url: 'api/categories',
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const getSubCategories = createAsyncThunk(
    'subCategories/getSubCategories',
    async (id) => {
        try {
            const response = appFetch({
                url: `api/subCategories/${id}`,
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const getCharitiesWithFilter = createAsyncThunk(
    'charities/getCharitiesWithFilter',
    async (requestSetting) => {
        try {
            const response = await appFetch({
                url: `api/gifts/filter?${requestSetting}`,
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const getAdminCharitiesWithFilter = createAsyncThunk(
    'charities/getCharitiesWithFilter',
    async (requestSetting) => {
        try {
            const response = await appFetch({
                url: `api/admin/filter?${requestSetting}`,
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const getGiftsById = createAsyncThunk(
    'giftById/getGiftsById',
    async (id) => {
        try {
            const response = await appFetch({
                url: `api/admin/gift/${id}`,
            })
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)

export const toBlockGifts = createAsyncThunk(
    'toBlock/toBlockGifts',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/blockGift/${id}`,
            })
            showSuccessMessage('Успешно заблокирован!')
            dispatch(getAdminCharitiesWithFilter())
            dispatch(getGiftsById(id))
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
export const toUnBlockGifts = createAsyncThunk(
    'toUnBlock/toUnBlockGifts',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/unBlockGift/${id}`,
            })
            showSuccessMessage('Успешно разблокирован!')
            dispatch(getAdminCharitiesWithFilter())
            dispatch(getGiftsById(id))
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
