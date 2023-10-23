// import Form from "./components/Attendance"
// import LectureSlides from "./components/LectureSlides"'
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Form from "./components/Login";
import Services from "./components/Services";
// import Services from "./components/Services"

const App = () => (
  <div>
    <Routes key={location.pathname} location={location}>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<Form />} />
      <Route path="/services" element={<Services />} />
      
    </Routes>
    {/* <LectureSlides/> */}
    {/* <Services/> */}
    {/* <Form/> */}
  </div>
);

export default App;
