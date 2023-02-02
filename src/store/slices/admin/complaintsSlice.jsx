import { createSlice } from '@reduxjs/toolkit'

import {
    getGiftAction,
    getWishAction,
    giftsComplaintsAction,
    wishesComplaintsAction,
} from './complaintsAction'

const initialState = {
    complaintOnGifts: [],
    complaintOnWishes: [],
    complaintWish: [],
    complaintGift: [],
    status: null,
}

export const giftsComplaintsSlice = createSlice({
    name: 'complaints',
    initialState,
    extraReducers: {
        [giftsComplaintsAction.fulfilled]: (state, action) => {
            state.complaintOnGifts = action.payload
            state.status = 'success'
        },
    },
})

export const getAllGiftsComplaints = giftsComplaintsSlice.actions

export const wishesComplaintsSlice = createSlice({
    name: 'complaints',
    initialState,
    extraReducers: {
        [wishesComplaintsAction.fulfilled]: (state, action) => {
            state.complaintOnWishes = action.payload
            state.status = 'success'
        },
    },
})

export const getAllWishesComplaints = wishesComplaintsSlice.actions

export const getComlaintWishSlice = createSlice({
    name: 'complaintWish',
    initialState,
    extraReducers: {
        [getWishAction.fulfilled]: (state, action) => {
            state.complaintWish = action.payload
            state.status = 'success'
        },
    },
})

export const getComplaintGiftSlice = createSlice({
    name: 'complaintGift',
    initialState,
    extraReducers: {
        [getGiftAction.fulfilled]: (state, action) => {
            state.complaintGift = action.payload
            state.status = 'success'
        },
    },
})
