import React from 'react'
import classes from '../routes/css/dashboard.module.css';


function DashboardHome() {
  return (
    <>
      <h3 className={classes.headingBox}>Overview</h3>
      <div className={classes.smallBox}>
        Small Box
      </div>
      <div className={classes.smallBox}>
        Small Box
      </div>
      <div className={classes.smallBoxLong}>
        Small Box Longer
      </div>
      <div className={classes.smallBoxLong}>
        Small Box Longer
      </div>
      <div className={classes.largeBox}>
        Large Box
      </div>
      <div className={classes.largeBoxLong}>
        Large Box Longer
      </div>
    </>
  )
}

export default DashboardHome