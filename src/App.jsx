import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './routes/Main';
import DashboardLoader, { dashboardLoader } from './routes/DashboardLoader';
import Error from './routes/Error';
import SignUp from './routes/SignUp';
import Login, { loginAction } from './routes/Login';
import Logout from './routes/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardLoader />,
        loader: dashboardLoader,
        errorElement: <Error />,
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
        element: <Logout />
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
