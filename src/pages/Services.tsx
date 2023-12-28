import { useEffect, useState } from "react";
import Attendance from "./Attendance";
import ClassAudio from "./ClassAudio";
import Login from "./Login";
import Card from "../components/Card";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import useStudentDetailsStore from "../store/useStudentDetails";


const Services = () => {
  const navigate = useNavigate();
  const [service, setServices] = useState("");

  const handleAttendanceClick = () => {
    setServices("attendance");
  };

  const handleClassAudioClick = () => {
    setServices("classAudio");
  };

  if (service === "attendance") {
    return <Attendance />;
  }
  if (service === "classAudio") {
    return <ClassAudio />;
  }
  if (service === "login") {
    return <Login />;
  }


  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/log-in")
  

  }, [])

  return (
    <>
      <div></div>
      <div className=" flex justify-center items-center w-full">
        <Nav>
          <div className="flex justify-between w-full flex-wrap gap-4 h-full">
            <Card
              imageUrl="/attendance.jpeg"
              name="Attendance"
              onClick={handleAttendanceClick}
              linkUrl={"/services/:attendance"}
            />
            <Card
              imageUrl="/pop.jpeg"
              name="Take Pop Quiz"
              linkUrl={"https://forms.gle/iGxMKzsg6opCbqML6"}
            />
            <Card
              imageUrl="/lecturer.jpeg"
              name="Lecturer Evaluation"
              linkUrl={"https://forms.gle/MV3wt4DKHwxhnAdo9"}
            />
            <Card
              imageUrl="/audii.jpeg"
              name="Audio Visual"
              onClick={handleClassAudioClick}
              linkUrl={"https://forms.gle/MV3wt4DKHwxhnAdo9"}
            />
          </div>
        </Nav>
      </div>
    </>
  );
};

export default Services;
