import { Outlet, Navigate } from 'react-router-dom'
import LoginUtils from '../utils/loginUtils';

const PrivateRoute = () => {
  const IsLogin = LoginUtils.IsLogin();
  return (
    IsLogin ? <Outlet /> : <Navigate to="/login" />
  )
}
export default PrivateRoute
