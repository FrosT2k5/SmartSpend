import classes from "../routes/css/dashboard.module.css";
import Menu from './Menu';
import Content from './Content';
import { Form, Link, NavLink, Outlet, useLoaderData } from 'react-router-dom';

function Dashboard() {
    const { userData } = useLoaderData();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Raw Balance",
            path: "/balance"
        },
        {
            name: "Expenses",
            path: "/expenses"
        },
        {
            name: "Investments",
            path: "/investments"
        },
        {
          name: "Settings",
          path: "/settings"
      },
        // {
        //     name: "Loans, EMIs",
        //     path: "/loans"
        // },
    ]

    return <div className={classes.mainDashboard}>
      <Menu>

      <div className={classes.profile}>
        <div className={classes.profileBox}>
          <img src="/profile.svg"></img>
          <p>
            {userData.name}
          </p>
        </div>
        <p> Balance ₹ {Number((userData.currentBalance).toFixed(1)).toLocaleString()} </p>
      </div>

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
        

        <Form method="POST" className={classes.flexEnd} >
          <input type="hidden" name="_action" value="logout" required={true}/>
          <button>
            Log Out
          </button>
        </Form>
      </Menu>

      <Content>
          <Outlet />
      </Content>
    </div>
  }
  

export default Dashboard