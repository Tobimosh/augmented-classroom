
import React, { Dispatch, SetStateAction } from "react";
import { FormData } from "../pages/Login";
import { Action } from "../Reducer/LoginReducer";

interface LoginFormData {
  matric_number: string;
  password: string;
}

interface StudentProps {
  state: LoginFormData;
  dispatch: Dispatch<Action>;
}

const StudentContext = React.createContext<StudentProps>({} as StudentProps)

export default StudentContext;


