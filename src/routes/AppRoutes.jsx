import React from 'react'

import { useSelector } from 'react-redux/es/exports'

import { ROLES } from '../utils/constants/constants'

import AdminRoutes from './AdminRoutes'
import GuestRoutes from './GuestRoutes'
import UserRoutes from './UserRoutes'

export const AppRoutes = () => {
    const { jwt, role } = useSelector((state) => state.authSlice.user)
    if (!jwt) {
        return <GuestRoutes />
    }

    return (
        <>
            {role === ROLES.ADMIN && <AdminRoutes />}
            {role === ROLES.USER && <UserRoutes />}
        </>
    )
}
