import { createSlice } from '@reduxjs/toolkit'

import { mainSearchAction, mainSearchInAdminAction } from './mainSearchAction'

const initialState = { options: [], optionsAdmin: [], status: null }
const mainSearchSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [mainSearchAction.fulfilled]: (state, action) => {
            state.options = action.payload
            state.status = 'success'
        },
        [mainSearchInAdminAction.fulfilled]: (state, action) => {
            state.optionsAdmin = action.payload
            state.status = 'success'
        },
    },
})
export const mainSearchSliceActions = mainSearchSlice.actions
export default mainSearchSlice
