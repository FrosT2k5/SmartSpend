import { useLoaderData } from 'react-router-dom';
import Intro from './Intro';
import Dashboard from '../components/Dashboard';


function DashboardLoader() {
  const userData = useLoaderData();
  return (
    <>
        {userData ? <Dashboard userData={userData}/> : <Intro /> }
    </>
  )
}

export default DashboardLoader