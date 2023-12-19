import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Services from "./pages/Services";
import LectureSlides from "./components/LectureSlides";
import ClassAudio from "./pages/ClassAudio";
import Attendance from "./pages/Attendance";
import "./App.css";
import { useReducer, useState } from "react";
import StudentContext from "./context/studentContext";
import { loginReducer } from "./Reducer/LoginReducer";


const App = () => {
    const [state, dispatch] = useReducer(loginReducer, {
      matric_number: "",
      password: "",
    });
    return (
      <div>
        <StudentContext.Provider value={{ state, dispatch }}>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<SignUp />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/:lecture-slides"
              element={<LectureSlides />}
            />
            <Route path="/services/:class-audio" element={<ClassAudio />} />
            <Route path="/services/:attendance" element={<Attendance />} />
          </Routes>
        </StudentContext.Provider>
      </div>
    );
}; 

export default App;
