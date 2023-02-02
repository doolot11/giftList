import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../api/CustomFetch'

export const getHolidayWish = createAsyncThunk(
    'holidayWish/getHolidayWish',
    async (id) => {
        const response = await appFetch({
            url: `api/holiday/wishes/${id}`,
        })
        return response
    }
)
