import { Outlet, Link } from 'react-router-dom';
import classes from "./css/main.module.css";

function Main() {

  return (
    <div className={classes.main}>
      <nav className={classes.navbar}>
        <div className={classes.navbarBrand}>
          <img src="public/logo.png" alt="Logo" className={classes.logo} />
          <span className={classes.brandName}> SmartSpend</span>
        </div>
        <div className={classes.navbarLinks}>
          <Link to="/about">About</Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Main