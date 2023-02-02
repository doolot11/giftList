import { configureStore } from '@reduxjs/toolkit'

import addCharity from './slices/AddCharity'
import { AddWishCardSlice } from './slices/addWishCardSlice'
// eslint-disable-next-line import/no-cycle
import charitySearching from './slices/admin/charitySlice'
import {
    getComlaintWishSlice,
    getComplaintGiftSlice,
    giftsComplaintsSlice,
    wishesComplaintsSlice,
} from './slices/admin/complaintsSlice'
import usersCardSlice from './slices/admin/usersPageSlice'
import { authSlice } from './slices/AuthSlice'
import bookedPageSlice from './slices/bookedPageSlice'
import friendProfileSlice from './slices/friendProfileSlice'
import { requestToFriendSlice, friendsSlice } from './slices/friendTabSlice'
import HolidayGiftsSlice from './slices/HolidayGiftsSlice'
import HolidaySlice from './slices/HolidaySlice'
import HomePageSlice from './slices/HomePageSlice'
import getUserSlice from './slices/mainSearchSlise'
import notificationsSlise from './slices/NotificationsSlice'
import profileSlice from './slices/ProfileSlice'

export const store = configureStore({
    reducer: {
        holiday: HolidaySlice.reducer,
        authSlice: authSlice.reducer,
        profileSlice: profileSlice.reducer,
        users: getUserSlice.reducer,
        friends: friendsSlice.reducer,
        requestToFriend: requestToFriendSlice.reducer,
        friend: friendProfileSlice.reducer,
        addCharity: addCharity.reducer,
        holidayUserGifts: HolidayGiftsSlice.reducer,
        wishCard: AddWishCardSlice.reducer,
        bookedCards: bookedPageSlice.reducer,
        giftComplaints: giftsComplaintsSlice.reducer,
        wishesComplaints: wishesComplaintsSlice.reducer,
        complaintWish: getComlaintWishSlice.reducer,
        complaintGift: getComplaintGiftSlice.reducer,
        homePageWishes: HomePageSlice.reducer,
        usersCard: usersCardSlice.reducer,
        searching: charitySearching.reducer,
        notification: notificationsSlise.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
