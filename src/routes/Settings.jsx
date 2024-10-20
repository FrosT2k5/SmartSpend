import React from 'react'
import classes from '../routes/css/dashboard.module.css';
import { Form, useLoaderData } from 'react-router-dom';

function Settings() {
  const { userData } = useLoaderData();

  return (
    <>
      <div className={classes.headingBox}>
        <h4 className={classes.textBold}> Settings </h4>
        <h4> View and change your account information and settings. </h4>
      </div>

      <div className={classes.smallBox}>
        <h4>
          <span className={classes.textBold}> Name: </span>
            { userData.name }
        </h4>
        <h4>
          <span className={classes.textBold}> Username: </span>
          { userData.username }
        </h4>
        <h4>
          <span className={classes.textBold}> Email: </span>
          { userData.email }
        </h4>
        <h4>
          <span className={classes.textBold}> Monthly Income: </span>
          ₹ { Number((userData.monthlyIncome).toFixed(1)).toLocaleString() }
        </h4>
      </div>

      <div className={classes.smallBoxLong} >
        <Form method='POST'>
          <p className={classes.textBold}> Update Account Info: </p>
          <p> New Name: </p>
          <input type='text' name='name'></input>

          <p>Monthly Income</p>
          <input type='number' name='income'></input>

          <p> New Password: </p>
          <input type='text' name='password'></input>

          <p> Confirm Password: </p>
          <input type='text' name='confirmPassword'></input>

          <input type="hidden" name="_action" value="updatePassword" required={true}/>
          <button type='submit' className={classes.submitButton}>
            Submit
          </button>
        </Form>
      </div>
    </>
  )
}

export default Settings