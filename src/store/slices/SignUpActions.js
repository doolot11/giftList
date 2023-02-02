import { appFetch } from '../../api/CustomFetch'
import { GIFTLIST_AUTH } from '../../utils/constants/constants'

import { actionAuth } from './AuthSlice'

export const signUp = ({ userData, setError }) => {
    return async (dispatch) => {
        try {
            const response = await appFetch({
                method: 'POST',
                url: 'api/public/register',
                body: userData,
            })
            const users = {
                id: response.id,
                jwt: response.jwt,
                role: response.role,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
            }
            const json = JSON.stringify(users)
            localStorage.setItem(GIFTLIST_AUTH, json)
            dispatch(
                actionAuth.baseAuth({
                    id: response.id,
                    jwt: response.jwt,
                    role: response.role,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                })
            )
        } catch (error) {
            setError('Этот аккаунт уже зарегистрирован')
        }
    }
}
