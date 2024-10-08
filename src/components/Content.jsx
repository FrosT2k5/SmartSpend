import React from 'react'
import classes from "../routes/css/dashboard.module.css";

function Content({ children }) {
  return (
    <div className={classes.dashboardContent}>
        {children}
    </div>
  )
}

export default Content