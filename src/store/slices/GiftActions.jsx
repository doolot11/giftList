import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch, appFetchFile } from '../../api/CustomFetch'
import { showErrorMessage, showSuccessMessage } from '../../utils/helpers'

export const postCharity = createAsyncThunk(
    'addCharity/post_Charity',
    async (props, { dispatch }) => {
        const formData = new FormData()
        try {
            formData.append('file', props.photo)

            const response = await appFetchFile({
                url: 'api/file/upload',
                body: formData,
            })
            const post = await appFetch({
                method: 'POST',
                url: 'api/gifts',
                body: {
                    name: props.name,
                    photo: response?.link,
                    categoryId: props.categoryId,
                    subCategoryId: props.subCategoryId,
                    status: props.status,
                    description: props.description,
                },
            })
            showSuccessMessage('Успешно добавлен!')
            dispatch(getCharity())
            dispatch(getMyCharity())
            return post
        } catch (error) {
            showErrorMessage(error.message)
            return error
        }
    }
)
export const getCharity = createAsyncThunk(
    'addCharity/getCharity',
    async () => {
        const response = await appFetch({ url: 'api/gifts' })
        return response
    }
)
export const getMyCharity = createAsyncThunk(
    'addCharity/getMyCharity',
    async () => {
        const response = await appFetch({ url: 'api/gifts/my-gifts' })
        return response
    }
)
export const getCategory = createAsyncThunk(
    'addCharity/getCategory',
    async (setData) => {
        const category = await appFetch({
            url: 'api/categories',
            method: 'GET',
        })
        setData(category)
        return category
    }
)
export const getSubCategory = createAsyncThunk(
    'addCharity/getSubCategory',
    async ({ id, setSubCategory }) => {
        const subCategory = await appFetch({
            url: `api/subCategories/${id}`,
            method: 'GET',
        })
        setSubCategory(subCategory)
        return subCategory
    }
)
export const toBookCharity = createAsyncThunk(
    'toBook/toBookCharity',
    async (id, { dispatch }) => {
        const response = await appFetch({
            method: 'POST',
            url: `api/bookings/gift-create/${id}`,
        })
        showSuccessMessage('Успешно забронирован!')
        dispatch(getCharity())
        dispatch(getMyCharity())
        dispatch(getSingleCharityById(id))
        return response
    }
)
export const toCancelCharity = createAsyncThunk(
    'toBook/toBookCharity',
    async (id, { dispatch }) => {
        const response = await appFetch({
            method: 'POST',
            url: `api/bookings/gift-cancel/${id}`,
        })
        dispatch(getCharity())
        dispatch(getMyCharity())
        dispatch(getSingleCharityById(id))
        return response
    }
)

export const getSingleCharityById = createAsyncThunk(
    'addCharity/charityById',
    async (id) => {
        const response = await appFetch({ url: `api/gifts/${id}` })
        return response
    }
)
export const putCharity = createAsyncThunk(
    'addCharity/putCharity',
    async (obj, { dispatch, rejectWithValue }) => {
        const formData = new FormData()
        try {
            const charityResponse = {}
            if (obj.photo.name) {
                formData.set('file', obj.photo)
                charityResponse.link = await appFetchFile({
                    url: 'api/file/upload',
                    body: formData,
                })
            }
            const response = await appFetch({
                method: 'PUT',
                url: `api/gifts/${obj.id}`,
                body: {
                    name: obj.name,
                    photo: obj.photo.name
                        ? charityResponse.link.link
                        : obj.photo,
                    categoryId: obj.categoryId,
                    subCategoryId: obj.subCategoryId,
                    status: obj.status,
                    description: obj.description,
                },
            })
            dispatch(getCharity())
            dispatch(getMyCharity())
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deletecharity = createAsyncThunk(
    'delete/deleteCharity',
    async (id, { dispatch }) => {
        const response = await appFetch({
            method: 'DELETE',
            url: `api/gifts/${id}`,
        })
        dispatch(getCharity())
        dispatch(getMyCharity())
        return response
    }
)
