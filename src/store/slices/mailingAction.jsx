import { createAsyncThunk } from '@reduxjs/toolkit'

import { appFetch, appFetchFile } from '../../api/CustomFetch'
import { showErrorMessage, showSuccessMessage } from '../../utils/helpers'

export const mailingAction = createAsyncThunk(
    'mailing/mailingAction',
    async ({ photo, mailingText, mailingTitle, onClose }) => {
        const formData = new FormData()
        let copy
        try {
            if (photo) {
                formData.set('file', photo)
                const fileResponse = await appFetchFile({
                    url: 'api/file/upload',
                    body: formData,
                })
                copy = fileResponse
            }
            const response = await appFetch({
                method: 'POST',
                url: 'api/mailing/send',
                body: {
                    photo: photo ? copy.photo : null,
                    title: mailingTitle,
                    text: mailingText,
                },
            })
            onClose()
            showSuccessMessage('Успешно отправлен!')
            return response
        } catch (error) {
            showErrorMessage('Что то пошло не так!')
            throw new Error(error.message)
        }
    }
)
