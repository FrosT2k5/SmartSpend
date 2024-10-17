import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { Form, useLoaderData } from 'react-router-dom';

function Expenses() {
  const { userData, expenses } = useLoaderData();

  return (
    <>
      <div className={classes.headingBox}>
        <h4 className={classes.textBold}> Expenses </h4>
        <h4> Check your account expenses, add new expenses and update existing ones. </h4>
      </div>
    </>
  )
}

export default Expenses