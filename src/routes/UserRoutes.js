import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import EditCharity from '../components/ui/charity/EditCharity'
import EditMyCharity from '../components/ui/charity/editMyCharity'
import Error from '../components/ui/Error'
import { Bookeds } from '../components/users/Bookeds'
import CharityInnerPage from '../components/users/charity/CharityInnerPage'
import CharityMyInnerPage from '../components/users/charity/CharityMyInnerPage'
import CharityUser from '../components/users/charity/CharityUser'
import { Lenta } from '../components/users/Lenta'
import MyHolidays from '../components/users/MyHolidays'
import AddWishCardPage from '../containers/AddWishCardPage'
import BookedPage from '../containers/BookedPage'
import EditWishCardPage from '../containers/EditWishCardPage'
import FriendProfilePage from '../containers/FriendProfilePage'
import { FriendsPage } from '../containers/FriendsPage'
import HolidayCardInnerPage from '../containers/HolidayCardInnerPage'
import HomePageWishCard from '../containers/HomePageWishCard'
import InnerPageWishCard from '../containers/InnerPageWishCard'
import EditProfile from '../containers/profile/EditProfile'
import Profile from '../containers/profile/Profile'
import UserProfile from '../containers/profile/UserProfile'
import WishList from '../containers/WishList'
import { PageLayout } from '../layout/PageLayout'
import { DEFAULT_ROUTES } from '../utils/constants/constants'

const UserRoutes = () => {
    return (
        <Routes>
            <Route path={DEFAULT_ROUTES.INDEX.PATH} element={<PageLayout />}>
                <Route path="/" element={<Navigate to="/lenta" />} />
                <Route path="/lenta" element={<Lenta />} />
                <Route path="/lenta/:wishId" element={<HomePageWishCard />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route
                    path="/friends/:userId"
                    element={<FriendProfilePage />}
                />
                <Route path="/bookeds" element={<Bookeds />} />
                <Route
                    path="/myprofile/edit_profile"
                    element={<EditProfile />}
                />
                <Route path="/myprofile" element={<UserProfile />} />
                <Route path="/myprofile/profile" element={<Profile />} />
                <Route path="/wish_list" element={<WishList />} />
                <Route
                    path="/wish_list/:wishListId"
                    element={<InnerPageWishCard />}
                />
                <Route path="/wish_list/add" element={<AddWishCardPage />} />
                <Route
                    path="/wish_list/:id/edit"
                    element={<EditWishCardPage />}
                />
                <Route path="/my_halidays" element={<MyHolidays />} />
                <Route
                    path="/my_halidays/:holidayGifts"
                    element={<HolidayCardInnerPage />}
                />
                <Route path="/bookedPage" element={<BookedPage />} />
                <Route path="/charity" element={<CharityUser />} />
                <Route path="/charity/add_charity" element={<EditCharity />} />
                <Route
                    path="/:editId/edit_charity"
                    element={<EditMyCharity />}
                />
                <Route path="/charity/:id" element={<CharityInnerPage />} />
                <Route
                    path="/charity/my/:id"
                    element={<CharityMyInnerPage />}
                />
            </Route>
            <Route path={DEFAULT_ROUTES.NOT_FOUND.PATH} element={<Error />} />
        </Routes>
    )
}

export default UserRoutes
