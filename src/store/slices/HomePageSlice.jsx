import { createSlice } from '@reduxjs/toolkit'

import { getSingleWishAction, getWishAction } from './HomePageActions'

const initialState = {
    homePageWishes: [],
    status: null,
    singleWish: {},
}
const HomePageSlice = createSlice({
    name: 'homePageWishes',
    initialState,
    extraReducers: {
        [getWishAction.pending]: (state) => {
            state.status = 'pending'
        },
        [getWishAction.rejected]: (state) => {
            state.status = 'rejected'
        },
        [getWishAction.fulfilled]: (state, action) => {
            state.homePageWishes = action.payload
            state.status = 'fulfilled'
        },
        [getSingleWishAction.pending]: (state) => {
            state.status = 'pending'
        },
        [getSingleWishAction.rejected]: (state) => {
            state.status = 'rejected'
        },
        [getSingleWishAction.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.singleWish = action.payload
        },
    },
})

export default HomePageSlice
