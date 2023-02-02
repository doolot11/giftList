import { appFetch } from '../../api/CustomFetch'
import {
    GIFTLIST_AUTH,
    GIFTLIST_REMEMBER,
} from '../../utils/constants/constants'

import { actionAuth } from './AuthSlice'

export const singInActions = ({ userData, setError, memorizee }) => {
    return async (dispatch) => {
        try {
            const response = await appFetch({
                method: 'POST',
                url: 'api/public/login',
                body: userData,
            })
            setError(response.message)
            const users = {
                id: response.id,
                jwt: response.jwt,
                role: response.role,
                memorizee,
                firstName: response.firstName,
                lastName: response.lastName,
                photo: response.photo,
            }

            const json = JSON.stringify(users)
            localStorage.setItem(GIFTLIST_AUTH, json)
            if (memorizee) {
                localStorage.setItem(
                    GIFTLIST_REMEMBER,
                    JSON.stringify({
                        id: response.id,

                        checked: memorizee,
                        jwt: response.jwt,
                        email: response.email,
                        role: response.role,
                        firstName: response.firstName,
                        lastName: response.lastName,
                    })
                )
            }
            dispatch(
                actionAuth.baseAuth({
                    id: response.id,
                    jwt: response.jwt,
                    role: response.role,
                    memorizee,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    photo: response.photo,
                })
            )
        } catch (error) {
            setError('Не правильный пароль или логин')
        }
    }
}
