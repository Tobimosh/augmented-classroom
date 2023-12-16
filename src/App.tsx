import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Services from "./pages/Services";
import LectureSlides from "./components/LectureSlides";
import ClassAudio from "./pages/ClassAudio";
import Attendance from "./pages/Attendance";
import "./App.css";
import { useState } from "react";


const App = () => {
    const [formData] = useState<FormData>();
  return (
    <div>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<SignUp />} />
        
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/lecture-slides" element={<LectureSlides />} />
          <Route path="/class-audio" element={<ClassAudio />} />
          <Route path="/attendance" element={<Attendance />} />
    
      </Routes>
    </div>
  );
}; 

export default App;
