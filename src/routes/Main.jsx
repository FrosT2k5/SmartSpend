import React from 'react'
import { Outlet } from 'react-router-dom';
import classes from "./css/main.module.css";

function Main() {

  return (
    <>
      <div className={classes.main}>
        <nav> Personal Finance Manager </nav>
        <main>
            <Outlet />
        </main> 
      </div>
    </>
  )
}

export default Main