import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { useLoaderData } from 'react-router-dom';


function DashboardHome() {

  const { userData } = useLoaderData();
  return (
    <>
      <div className={classes.headingBox}>
        <h4> Overview </h4>
        <h4> Welcome, {userData.name}. Financial Freedom begins with Planning. </h4>
      </div>
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