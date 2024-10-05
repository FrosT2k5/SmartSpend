import { useEffect, useRef } from 'react'
import classes from "./css/intro.module.css";
import { Form, Link, Navigate, redirect, useLoaderData } from 'react-router-dom';
import { login } from '../api/apiutils'

export async function loginAction({ request }) {

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
  
    // login user
    if (_action === "loginUser") {
      try {
        const resp = await login(values.userName, values.password);
        if (!resp?.token) {
            alert("Invalid credentials.");
            return null;
        }
        else {
            return redirect("/");
        }
      } catch (e) {
        console.log(e.message);
        throw new Error("There was a problem creating your account.");
      }
    }
  }

function Login() {
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
        <img src='/login-illustration.png' className={classes.loginIllustration}></img>
        <img src='/loginbackground.svg' className={classes.loginBackground}></img>
        <div className={classes.loginBody} >
            <Form className={classes.loginForm} method='post'>
                <h1 
                    className={`${classes.bold} ${classes.headingText} ${classes.mtb_3}`}
                    style={{"marginTop": "15px"}}
                >
                    Hey there!
                </h1>
                <h1 className={`${classes.bold} ${classes.mtb_3}`}>LOGIN</h1>

                <p>Username</p>
                <input type='text' name='userName' ref={focusRef}></input>

                <p>Password</p>
                <input type='password' name='password' ></input>
                
                <input type="hidden" name="_action" value="loginUser" />
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