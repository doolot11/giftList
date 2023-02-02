import { useEffect } from 'react'

import AOS from 'aos'

import Notification from './components/ui/notification/Notification'
import { AppRoutes } from './routes/AppRoutes'

function App() {
    useEffect(() => {
        AOS.init()
        AOS.refresh()
    }, [])
    return (
        <div className="App">
            <AppRoutes />
            <Notification />
        </div>
    )
}

export default App
