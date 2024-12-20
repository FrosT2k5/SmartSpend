import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './routes/Main';
import DashboardLoader from './routes/DashboardLoader';
import Error from './routes/Error';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import DashboardHome from './routes/DashboardHome';
import Investments from './routes/Investments';
import Expenses from './routes/Expenses';
import { accountTransaction, addNewInvestment, dashboardAction, loginAction, signupAction, updateAccount, updateExpenses } from './routes/helpers/Actions';
import { dashboardLoader, expenseLoader, investmentLoader, userData } from './routes/helpers/Loaders';
import Balance from './routes/Balance';
import About from './routes/About';
import Settings from './routes/Settings';
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <DashboardLoader />,
        loader: dashboardLoader,
        errorElement: <Error />,
        action: dashboardAction,
        children: [
          {
            index: true,
            element: <DashboardHome />,
            errorElement: <Error />,
            loader: dashboardLoader,
          },
          {
            path: "/about",
            element: <About />,
            errorElement: <Error />,
          },
          {
            path: "/investments",
            element: <Investments />,
            errorElement: <Error />,
            loader: investmentLoader,
            action: addNewInvestment,
          },
          {
            path: "/balance",
            element: <Balance />,
            errorElement: <Error />,
            loader: dashboardLoader,
            action: accountTransaction,
          },
          {
            path: "/expenses",
            element: <Expenses />,
            errorElement: <Error />,
            loader: expenseLoader,
            action: updateExpenses,
          },
          {
            path: "/settings",
            element: <Settings />,
            errorElement: <Error />,
            loader: userData,
            action: updateAccount,
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
        errorElement: <Error />,
        loader: dashboardLoader,
        action: signupAction,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <Error />,
        action: loginAction,
        loader: dashboardLoader,
      },
    ]
  },
],
// {basename: "/SmartSpend"},
);


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />
      <RouterProvider router={router}/ >
    </>
  )
}

export default App
