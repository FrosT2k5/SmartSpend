/* eslint-disable react/prop-types */
import React from 'react'
import classes from "../routes/css/dashboard.module.css";
import Menu from './Menu';
import Content from './Content';
import { Link, NavLink, Outlet } from 'react-router-dom';

function Dashboard( {userData} ) {

    return <div className={classes.mainDashboard}>
      <Menu>
        <NavLink 
            to="/" 
            className={
                ({ isActive }) => isActive ? classes.navLinkActive : classes.navLink
            }
        >

            <h3>Dashboard</h3>
        </NavLink>

        <NavLink 
            to="/investments" 
            className={
                ({ isActive }) => isActive ? classes.navLinkActive : classes.navLink
            }
        >
            <h3>Investments</h3>
        </NavLink>

        <NavLink 
            to="/expenses" 
            className={
                ({ isActive }) => isActive ? classes.navLinkActive : classes.navLink
            }
        >
            <h3>Expenses</h3>
        </NavLink>

        <Link to="/logout" className={classes.flexEnd}>
            Log Out
        </Link>
      </Menu>

      <Content>
          <Outlet />
      </Content>
    </div>
  }
  

export default Dashboard