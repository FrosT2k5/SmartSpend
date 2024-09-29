import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './routes/Main';
import Dashboard, { dashboardLoader } from './routes/Dashboard';
import Error from './routes/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      // {
      //   path: "logout",
      //   action: logoutAction
      // }
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
