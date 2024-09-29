import React from 'react'
import { useLoaderData } from 'react-router-dom';
import Intro from './Intro';

export function dashboardLoader() {
  const userName = "";
  return { userName };
}

function Dashboard() {
  const { userName } = useLoaderData();
  return (
    <>
        {userName ? (<div>Dashboard, {userName}</div>) : <Intro /> }
    </>
  )
}

export default Dashboard