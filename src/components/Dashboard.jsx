/* eslint-disable react/prop-types */
import React from 'react'
import classes from "../routes/css/dashboard.module.css";
import Menu from './Menu';
import Content from './Content';
import { Link, NavLink, Outlet } from 'react-router-dom';

function Dashboard( {userData} ) {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Expenses",
            path: "/expenses"
        },
        {
            name: "Investments",
            path: "/investments"
        },
    ]

    return <div className={classes.mainDashboard}>
      <Menu>
      { menuItems.map((item, index) => <NavLink 
            to={item.path}
            className={
                ({ isActive }) => isActive ? classes.navLinkActive : classes.navLink
            }
            key={index}
        >
            <h4>{ item.name }</h4>
        </NavLink>) 
      }
        

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