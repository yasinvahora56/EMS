import { RouterProvider } from "react-router-dom";
import router from "./Components/Routes/Main_Routes";



function App() {

  return (
    <RouterProvider router={router} />  
  );
}

export default App
