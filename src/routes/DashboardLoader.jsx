/* eslint-disable react/prop-types */
import { useLoaderData } from 'react-router-dom';
import Intro from './Intro';
import { getUser } from '../api/apiutils';
import Dashboard from '../components/Dashboard';

export async function dashboardLoader() {
  const userData  = await getUser();
  return userData;
}


function DashboardLoader() {
  const userData = useLoaderData();
  return (
    <>
        {userData ? <Dashboard userData={userData}/> : <Intro /> }
    </>
  )
}

export default DashboardLoader