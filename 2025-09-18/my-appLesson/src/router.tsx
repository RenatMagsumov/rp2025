import { createHashRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Card from './pages/Card'
import Profile from './pages/Profile'

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <Card /> },
            { path: 'something', element: <Profile /> },
        ],
    },
])

export default router
