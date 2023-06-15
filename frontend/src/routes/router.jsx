import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import Authentication from './Authentication'
import Register from './Register'
import Dashboard from './Dashboard'
import ErrorPage from './Error'

import Messages from '../features/channels/messages/Messages'


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
    path: '/channels',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [{
      path: '/channels/:channelId',
      element: <Messages />,
    }],
    errorElement: <ErrorPage />,
  },
])

export default router
