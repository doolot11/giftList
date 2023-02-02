import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch } from '../../api/CustomFetch'

export const getWishAction = createAsyncThunk(
    'homePage/getAllgifts',
    async () => {
        const response = await appFetch({
            url: 'api/feed',
        })
        return response
    }
)
export const getSingleWishAction = createAsyncThunk(
    'homePage/getSingleWishs',
    async (id) => {
        const response = await appFetch({
            url: `api/wish/${id}`,
        })
        return response
    }
)
