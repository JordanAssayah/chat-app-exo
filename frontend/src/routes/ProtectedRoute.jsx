import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, redirectPath = '/' }) => {
  const username = useSelector(state => state.auth.username)

  if (!username) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
  redirectPath: PropTypes.string,
}

export default ProtectedRoute
