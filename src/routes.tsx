import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Nav from "./components/Nav";


createBrowserRouter([
    {
        path: '/log-in', 
        element: <Login/>
    },
    {
        path: '/sign-up',
        element: <SignUp/>
    },

])