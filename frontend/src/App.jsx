import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login"
import Signup from "./Components/User/Signup/Signup"
import Software from "./Software/Software"
import SideBar from "./Components/User/Sidebar/SideBar";



function App() {

  const router = createBrowserRouter([
    {
      path: '/Signup',
      element: <Signup />,
    },
    {
      path: '/Login',
      element: <Login />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App
