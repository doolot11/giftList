import { createSlice } from '@reduxjs/toolkit'

import {
    getCategories,
    getCharitiesWithFilter,
    getGiftsById,
    getSubCategories,
} from './charityAction'

const initialState = {
    categories: [],
    subCategories: [],
    charities: [],
    giftById: {},
}

const charitySearching = createSlice({
    name: 'searching',
    initialState,
    extraReducers: {
        [getCategories.fulfilled]: (state, { payload }) => {
            state.categories = payload
        },
        [getSubCategories.fulfilled]: (state, { payload }) => {
            state.subCategories = payload
        },
        [getCharitiesWithFilter.fulfilled]: (state, { payload }) => {
            state.charities = payload
        },
        [getGiftsById.fulfilled]: (state, { payload }) => {
            state.giftById = payload
        },
    },
})

export const SearchingActions = charitySearching.actions
export default charitySearching
