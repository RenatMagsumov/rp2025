import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import './consoleDemo'


import { theme } from './Theme'
import RootLayout from './layouts/RootLayouts'

// страницы
import Home from './pages/Home'
import Profile from './pages/Profile'
import CardPage from './pages/Card'
import StorageDemo from './pages/StorageDemo'

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <Profile /> },
      { path: 'card', element: <CardPage /> },
      { path: 'storage-demo', element: <StorageDemo /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
