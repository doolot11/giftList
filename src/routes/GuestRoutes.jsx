import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Error from '../components/ui/Error'
import { LandingPage } from '../containers/LandingPage'
import { DEFAULT_ROUTES } from '../utils/constants/constants'

const GuestRoutes = () => {
    return (
        <Routes>
            <Route path={DEFAULT_ROUTES.INDEX.PATH} element={<LandingPage />} />
            <Route path={DEFAULT_ROUTES.NOT_FOUND.PATH} element={<Error />} />
        </Routes>
    )
}

export default GuestRoutes
