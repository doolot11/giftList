import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../../api/CustomFetch'
import { showErrorMessage, showSuccessMessage } from '../../../utils/helpers'

export const giftsComplaintsAction = createAsyncThunk(
    'complaints/giftsComplaints',
    async () => {
        const response = await appFetch({
            url: `api/complaints/gifts`,
        })
        return response
    }
)
export const wishesComplaintsAction = createAsyncThunk(
    'complaints/wisheComplaints',
    async () => {
        const response = await appFetch({
            url: `api/complaints/wishes`,
        })
        return response
    }
)
export const deleteComplaintAction = createAsyncThunk(
    'deleteComplaint/deleteComplaintAction',
    async (complaintId, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'DELETE',
                url: `api/complaints/${complaintId}`,
            })
            dispatch(giftsComplaintsAction())
            dispatch(wishesComplaintsAction())
            showSuccessMessage('Успешно удален!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)

export const getWishAction = createAsyncThunk(
    'complaintWish/getWishAction',
    async (wishId, { dispatch }) => {
        const response = await appFetch({
            url: `api/complaints/wish/${wishId}`,
        })
        dispatch(giftsComplaintsAction())
        return response
    }
)

export const getGiftAction = createAsyncThunk(
    'complaintGift/getGiftAction',
    async (giftId, { dispatch }) => {
        const response = await appFetch({
            url: `api/complaints/gift/${giftId}`,
        })
        dispatch(wishesComplaintsAction())
        return response
    }
)

export const toBlockWishAction = createAsyncThunk(
    'blockWish/blockWishAction',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/blockWish/${id}`,
            })
            dispatch(getWishAction(id))
            dispatch(wishesComplaintsAction())
            showSuccessMessage('Успешно заблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)

export const unBlockWishAction = createAsyncThunk(
    'unBlockWish/unBlockWishAction',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/unBlockWish/${id}`,
            })
            dispatch(wishesComplaintsAction())
            dispatch(getWishAction(id))
            showSuccessMessage('Успешно разблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)

export const toBlockGiftAction = createAsyncThunk(
    'blockGift/toBlockGiftAction',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/blockGift/${id}`,
            })
            dispatch(giftsComplaintsAction())
            dispatch(getGiftAction(id))
            showSuccessMessage('Успешно заблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)

export const unBlockGiftAction = createAsyncThunk(
    'unBlockGift/unBlockGiftAction',
    async (id, { dispatch }) => {
        try {
            const response = await appFetch({
                method: 'PUT',
                url: `api/admin/unBlockGift/${id}`,
            })
            dispatch(giftsComplaintsAction())
            dispatch(getGiftAction(id))
            showSuccessMessage('Успешно разблокирован!')
            return response
        } catch (error) {
            return showErrorMessage('Что-то пошло не так!')
        }
    }
)
