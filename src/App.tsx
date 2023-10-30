import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Services from "./components/Services";
import LectureSlides from "./components/LectureSlides";
import ClassAudio from "./components/ClassAudio";
import Attendance from "./components/Attendance";

const App = () => {
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
