import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Form from "./components/Login";
import Services from "./components/Services";
import LectureSlides from "./components/LectureSlides";

const App = () => (
  <div>
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<SignUp />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<Form />} />
      <Route path="/services" element={<Services />} />
      <Route path="/lecture-slides" element={<LectureSlides />} />
    </Routes>
  </div>
);

export default App;
