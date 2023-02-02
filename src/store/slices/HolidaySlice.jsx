import { createSlice } from '@reduxjs/toolkit'

import {
    getHoliday,
    postHoliday,
    getHolidayById,
    putHoliday,
    deleteHoliday,
} from './HolidayActions'

const initialState = {
    holiday: [],
    getSingleHoliday: {},
    error: null,
    status: null,
    loadingSpinner: null,
    modal: false,
    editmodal: false,
}
const HolidaySlice = createSlice({
    name: 'holiday',
    initialState,
    reducers: {
        clearHoliday(state) {
            state.getSingleHoliday = {}
        },
    },
    extraReducers: {
        [postHoliday.pending]: (state) => {
            state.status = 'pending'
        },
        [postHoliday.fulfilled]: (state, action) => {
            state.status = 'success'
            state.error = action.payload.error
        },
        [postHoliday.rejected]: (state) => {
            state.status = 'rejected'
        },
        [getHoliday.pending]: (state) => {
            state.status = 'pending'
            state.loadingSpinner = 'pending'
        },
        [getHoliday.fulfilled]: (state, action) => {
            state.holiday = action.payload.reverse()
            state.status = 'success'
            state.loadingSpinner = 'success'
        },
        [getHoliday.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
            state.loadingSpinner = 'rejected'
        },
        [getHolidayById.pending]: (state) => {
            state.status = 'pending'
        },
        [getHolidayById.fulfilled]: (state, action) => {
            state.getSingleHoliday = action.payload
            state.status = 'success'
        },
        [getHolidayById.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        [putHoliday.pending]: (state) => {
            state.status = 'pending'
        },
        [putHoliday.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        [putHoliday.fulfilled]: (state) => {
            state.status = 'success'
            state.editmodal = true
        },
        [deleteHoliday.pending]: (state) => {
            state.status = 'pending'
        },
        [deleteHoliday.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message
        },
        [deleteHoliday.fulfilled]: (state) => {
            state.status = 'success'
        },
    },
})
export const { clearHoliday } = HolidaySlice.actions
export default HolidaySlice
