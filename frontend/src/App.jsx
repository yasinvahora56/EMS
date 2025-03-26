import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./Components/Routes/Main_Routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {

  

  return (
   <>
    <ToastContainer />
 
        <RouterProvider router={router} />
      
   </>
  );
}

export default App
