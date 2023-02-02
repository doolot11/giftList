import { createSlice } from '@reduxjs/toolkit'

import { getHolidayWish } from './HolidayGiftsActions'

const initialState = {
    holidayUserGifts: [],
}

const HolidayGiftsSlice = createSlice({
    initialState,
    name: 'holidayUserGifts',
    extraReducers: {
        [getHolidayWish.pending]: (state) => {
            state.status = 'pending'
        },
        [getHolidayWish.rejected]: (state) => {
            state.status = 'rejected'
        },
        [getHolidayWish.fulfilled]: (state, action) => {
            state.holidayUserGifts = action.payload
            state.status = 'success'
        },
    },
})
export const HolidayGifts = HolidayGiftsSlice.actions
export default HolidayGiftsSlice
