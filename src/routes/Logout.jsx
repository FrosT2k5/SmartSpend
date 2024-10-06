import { useEffect } from 'react';
import { logout } from '../api/apiutils'
import { Navigate, useLoaderData, useRevalidator } from 'react-router-dom';

function Logout() {
  const userData = useLoaderData();
  const revalidator = useRevalidator();

  useEffect( () => {
    logout();
    revalidator.revalidate();
    console.log(userData);
  }, [revalidator]);

  return (
    <Navigate to="/" />
  )
}

export default Logout