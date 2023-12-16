
import React from "react";
import { FormData } from "../pages/Login";


const StudentContext = React.createContext<FormData>({matric_number: '', password: ""})

export default StudentContext;


