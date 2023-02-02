import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../api/CustomFetch'
import { showSuccessMessage } from '../../utils/helpers'

export const getBookedWishes = createAsyncThunk(
    'bookedWishesCard/getBookedWishes',
    async () => {
        try {
            const response = await appFetch({
                url: 'api/bookings/wishes',
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
export const addFriendsWishInMyWish = createAsyncThunk(
    'bookedWishesCard/addFriendsWishInMyWish',
    async (obj) => {
        try {
            const response = await appFetch({
                method: 'POST',
                url: `api/wish/add/${obj.id}`,
            })
            showSuccessMessage('Successfull')
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)

export const postCancelBookedWish = createAsyncThunk(
    'bookedWishesCard/cancelBookedWish',
    async (obj) => {
        try {
            const response = await appFetch({
                method: 'POST',
                url: `api/bookings/wish-cancel/${obj.id}`,
            })
            obj.dispatch(getBookedWishes())
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)

export const getBookedGifts = createAsyncThunk(
    'bookedGiftsCard/getBookedGifts',
    async () => {
        try {
            const response = await appFetch({
                url: 'api/bookings/gifts',
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)

export const postCancelBookedGift = createAsyncThunk(
    'cancelBooked/cancelBookedGift',
    async (obj) => {
        try {
            const response = await appFetch({
                method: 'POST',
                url: `api/bookings/gift-cancel/${obj.id}`,
            })
            obj.dispatch(getBookedGifts())
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
)
