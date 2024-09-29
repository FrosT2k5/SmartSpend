import React from 'react'
import classes from "./css/intro.module.css";
import { Form, Link } from 'react-router-dom';

function Login() {
  return (
    <div className={classes.intro}>
        <img src='/login-illustration.png' className={classes.loginIllustration}></img>
        <img src='/loginbackground.svg' className={classes.loginBackground}></img>
        <div className={classes.loginBody} >
            <Form className={classes.loginForm}>
                <h1 
                    className={`${classes.bold} ${classes.headingText} ${classes.mtb_3}`}
                    style={{"marginTop": "15px"}}
                >
                    Hey there!
                </h1>
                <h1 className={`${classes.bold} ${classes.mtb_3}`}>LOGIN</h1>

                <p>Username</p>
                <input type='text' name='userName'></input>

                <p>Password</p>
                <input type='password' name='password' ></input>
                
                <button type='submit'>
                    Submit
                </button>

                <Link 
                    to="/signup" 
                >
                    <p style={{"marginBottom": "30px"}}>Sign Up Instead</p>
                </Link>

            </Form>
        </div>
    </div>
  )
}

export default Login;