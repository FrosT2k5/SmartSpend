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
import Logout from './routes/Logout';
import DashboardHome from './routes/DashboardHome';
import Investments from './routes/Investments';
import Expenses from './routes/Expenses';
import { loginAction } from './routes/helpers/Actions';
import { dashboardLoader } from './routes/helpers/Loaders';

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
        children: [
          {
            index: true,
            element: <DashboardHome />,
            errorElement: <Error />,
          },
          {
            path: "/investments",
            element: <Investments />,
            errorElement: <Error />,
          },
          {
            path: "/expenses",
            element: <Expenses />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
        errorElement: <Error />,
        loader: dashboardLoader,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <Error />,
        action: loginAction,
        loader: dashboardLoader,
      },
      {
        path: "logout",
        element: <Logout />,
        loader: dashboardLoader,
      },
    ]
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router}/ >
    </>
  )
}

export default App
