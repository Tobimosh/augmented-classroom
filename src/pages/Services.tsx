import { useState } from "react";
import Attendance from "./Attendance";
import ClassAudio from "./ClassAudio";
import Login from "./Login";
import Card from "../components/Card";
import Nav from "../components/Nav";


interface Props {
  num: string;
}

const Services = ({num}: Props) => {
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

  return (
    <>
      {/* <div className="w-[100vw] flex justify-center">
        <h2 className="text-6xl">AUGMENTED CLASSROOM</h2>
      </div> */}
      <div></div>
      <div className=" flex justify-center items-center w-full">
        <Nav matric_num={num} >
          <div className="flex justify-between w-full flex-wrap gap-4 h-full">
            <Card
              imageUrl="/attendance.jpeg"
              name="Attendance"
              onClick={handleAttendanceClick}
              linkUrl={"/attendance"}
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
