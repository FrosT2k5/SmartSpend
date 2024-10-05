import { logout } from '../api/apiutils'
import { Navigate } from 'react-router-dom';

function Logout() {
    logout();
  return (
    <Navigate to="/" />
  )
}

export default Logout