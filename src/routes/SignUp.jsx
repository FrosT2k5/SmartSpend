import React from 'react';
import classes from "./css/intro.module.css";
import { Form, Link } from 'react-router-dom';

function Signup() {
  return (
    <div className={classes.intro}>
      <img src='/signup-illustration.png' className={classes.signupIllustration} alt="Signup Illustration" />
      <img src='/loginbackground.svg' className={classes.loginBackground}></img>
      <div className={classes.loginBody}>
        <Form className={classes.loginForm}>
          <h1 
            className={`${classes.bold} ${classes.headingText} ${classes.mtb_3}`}
            style={{ marginTop: "15px" }}
          >
            Welcome!
          </h1>
          <h1 className={`${classes.bold} ${classes.mtb_3}`}>SIGN UP</h1>

          <p>Username</p>
          <input type='text' name='userName' />

          <p>Current Balance</p>
          <span>₹</span>
          <input type='number' name='currentBalance' />

          <p>Monthly Salary</p>
          <span>₹</span>
          <input type='number' name='monthlySalary' />

          <p>Password</p>
          <input type='password' name='password' />



          <button type='submit'>Submit</button>

          <Link to="/login">
            <p style={{ marginBottom: "30px" }}>Already have an account? Log In</p>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
