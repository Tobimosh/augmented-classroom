import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";


createBrowserRouter([
    {
        path: '/', 
        element: <Login/>
    }
])