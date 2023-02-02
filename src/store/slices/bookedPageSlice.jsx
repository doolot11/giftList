import { createSlice } from '@reduxjs/toolkit'

import { getBookedGifts, getBookedWishes } from './bookedPageAction'

const initialState = {
    bookedWishesCard: [],
    bookedGiftsCard: [],
}

const bookedPageSlice = createSlice({
    name: 'bookedCards',
    initialState,
    extraReducers: {
        [getBookedWishes.fulfilled]: (state, { payload }) => {
            state.bookedWishesCard = payload
        },
        [getBookedGifts.fulfilled]: (state, { payload }) => {
            state.bookedGiftsCard = payload
        },
    },
})

export const bookedCardsAction = bookedPageSlice.actions
export default bookedPageSlice
