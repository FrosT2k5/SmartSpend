import { useEffect, useRef } from "react";
import classes from "./css/intro.module.css";
import { Form, Link, Navigate, useLoaderData } from 'react-router-dom';

function SignUp() {
  const userData = useLoaderData();
  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  }, [])

  if (userData?.username) {
    return <Navigate to="/"/>
  }

  return (
    <div className={classes.intro}>
      <img src='/signup-illustration.png' className={classes.signupIllustration} alt="Signup Illustration" />
      <img src='/loginbackground.svg' className={classes.loginBackground}></img>
      <div className={classes.loginBody}>
        <Form className={classes.loginForm} method="POST">
          <h1 
            className={`${classes.bold} ${classes.headingText} ${classes.mtb_3}`}
            style={{ marginTop: "15px" }}
          >
            Get Started!
          </h1>
          <h1 className={`${classes.bold} ${classes.mtb_3}`}>SIGN UP</h1>

          <p>Name</p>
          <input type='text' name='name' placeholder='John Doe' ref={focusRef} required={true}/>

          <p>Username</p>
          <input type='text' name='userName' placeholder='john_doe' required={true}/>

          <p>Email</p>
          <input type='text' name='email' placeholder='johndoe@example.com' required={true}/>

          <p>Password</p>
          <input type='password' name='password' placeholder='A strong password' required={true}/>

          <button type='submit'>Submit</button>

          <Link to="/login">
            <p style={{ marginBottom: "30px" }}>Already have an account? Log In</p>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
