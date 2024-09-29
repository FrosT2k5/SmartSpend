import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Intro from './Intro';

export function dashboardLoader() {
  const userName = "";
  return { userName };
}


function Dashboard( {userName} ) {
  return <>
    DashBoard, { userName }
  </>
}
function DashboardLoader() {
  const { userName } = useLoaderData();
  return (
    <>
        {userName ? <Dashboard userName={userName}/> : <Intro /> }
    </>
  )
}

export default DashboardLoader