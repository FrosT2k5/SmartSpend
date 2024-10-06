import React from 'react'
import classes from "../routes/css/dashboard.module.css";

function Menu({ children }) {
  return (
    <div className={classes.dashboardMenu}>
        Menu
        {children}
    </div>
  )
}

export default Menu