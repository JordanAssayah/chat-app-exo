import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import Authentication from './Authentication'
import Register from './Register'
import Dashboard from './Dashboard'
import ErrorPage from './Error'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Authentication />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
])

export default router
