import { createSlice } from '@reduxjs/toolkit'

import {
    addGift,
    deleteWishGift,
    getHolidaysToSelect,
    getWishGift,
    getWishWithId,
    putWishCard,
} from './AddWishCardActions'

const initialState = {
    cards: [],
    dataWishCardWithId: {},
    holidaysToSelect: [],
    status: null,
    deleteId: false,
    photo: '',
}

export const AddWishCardSlice = createSlice({
    name: 'wishCard',
    initialState,
    extraReducers: {
        [addGift.pending]: (state) => {
            state.status = 'pending'
        },
        [addGift.rejected]: (state) => {
            state.status = 'rejected'
        },
        [addGift.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = action.payload
        },
        [getWishGift.pending]: (state) => {
            state.status = 'pending'
        },
        [getWishGift.rejected]: (state) => {
            state.status = 'rejected'
        },
        [getWishGift.fulfilled]: (state, { payload }) => {
            state.cards = payload.reverse()
            state.status = 'success'
        },
        [deleteWishGift.pending]: (state) => {
            state.status = 'pending'
        },
        [deleteWishGift.rejected]: (state) => {
            state.status = 'rejected'
        },
        [deleteWishGift.fulfilled]: (state) => {
            state.status = 'success'
            state.deleteId = !state.deleteId
        },
        [getWishWithId.fulfilled]: (state, { payload }) => {
            state.status = 'success'
            state.dataWishCardWithId = payload
        },
        [getHolidaysToSelect.fulfilled]: (state, { payload }) => {
            state.holidaysToSelect = payload
        },
        [putWishCard.pending]: (state) => {
            state.status = 'pending'
        },
    },
})

export const cardSliceActions = AddWishCardSlice.actions
export default AddWishCardSlice
