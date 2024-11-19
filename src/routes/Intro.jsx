import React from 'react'
import { Form, Link } from 'react-router-dom'
import classes from "./css/intro.module.css";
import loginIllustrationUrl from '/login-illustration.png';
import loginBackgroundUrl from '/loginbackground.svg';
import introIllustrationUrl from '/intro-illustration.png';

function Intro() {
  return (
    <div className={classes.intro}>
      <img src={loginIllustrationUrl} className={classes.loginIllustration}></img>
      <img src={loginBackgroundUrl} className={classes.loginBackground}></img>

      <div className={classes.introBody}> 
        <h1> Welcome to <span className={classes.highlight}>SmartSpend</span> </h1>
        <h2> 
          Planning is the secret of <span className={classes.highlight}> Financial Freedom</span> 
        </h2>
  
        <img src={introIllustrationUrl} className={classes.centerAlign}></img>
        <h4 > Are you ready to start your finance journey?</h4>
        <Link to="/signup">
          <button> Sign Up </button>
        </Link>
        <Link to="/login">
          <button> Login </button>
        </Link>
      </div>
    </div>
  )
}

export default Intro