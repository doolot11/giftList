import { appFetch } from '../../api/CustomFetch'
import signInWithGoogle from '../../firebase/Firebase'
import {
    GIFTLIST_AUTH,
    GIFTLIST_REMEMBER,
} from '../../utils/constants/constants'

import { actionAuth } from './AuthSlice'

export const googleAuthorization = (memorizee) => {
    return async (dispatch) => {
        try {
            const user = await signInWithGoogle()

            const response = await appFetch({
                method: 'POST',
                url: `api/public/auth/google?token=${user.accessToken}`,
            })
            const users = {
                id: response.id,
                jwt: response.jwt,
                role: response.role,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                photo: response.photo,
            }
            const json = JSON.stringify(users)
            localStorage.setItem(GIFTLIST_AUTH, json)
            dispatch(
                actionAuth.baseAuth({
                    id: response.id,
                    jwt: response.jwt,
                    role: response.role,
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    photo: response.photo,
                })
            )
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
        } catch (e) {
            throw new Error('Что-то пошло не так!')
        }
    }
}
