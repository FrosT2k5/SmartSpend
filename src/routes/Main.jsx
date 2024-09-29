import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';

function Main() {

  return (
    <>
      <div className='main'>
        <nav> Personal Finance Manager </nav>
        <main>
            <Outlet />
        </main> 
      </div>
    </>
  )
}

export default Main