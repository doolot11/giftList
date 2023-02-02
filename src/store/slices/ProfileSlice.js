import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    firstName: null,
    lastName: null,
    photo: null,
    userId: null,
    userInfo: {
        city: null,
        clothingSize: null,
        dateOfBirth: null,
        facebookLink: null,
        hobby: null,
        id: null,
        importantNote: null,
        instagramLink: null,
        phoneNumber: null,
        shoeSize: null,
        telegramLink: null,
        vkLink: null,
    },
}
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getuser: (state, action) => {
            const data = action.payload
            state.email = data.email
            state.firstName = data.firstName
            state.lastName = data.lastName
            state.photo = data.photo
            state.userId = data.userId
            state.userInfo = data.userInfo
        },
    },
})
export const profileActions = profileSlice.actions
export default profileSlice
