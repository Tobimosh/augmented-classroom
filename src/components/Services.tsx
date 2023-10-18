import { useState } from "react";
import Attendance from "./Attendance";
import ClassAudio from "./ClassAudio";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";

const Services = () => {
  const [service, setServices] = useState("");

  // const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAttendanceClick = () => {
    //   setIsSubmitted(true);
    setServices("attendance");
  };
  const handleClassAudioClick = () => {
    setServices('classAudio')
  }
  const handleBackButton = () => {
    setServices("home")
  }

  if (service === "attendance") {
    return <Attendance />;
  }
  if (service === "classAudio") {
    return <ClassAudio/>
  }
  if(service === "home"){
    return <Login/>
  }

  return (
    <>
      <div className="w-[100vw] flex justify-center">
        <h2 className="text-6xl">AUGMENTED CLASSROOM</h2>
      </div>
      <div className="h-[90vh] flex justify-center items-center w-full">
        <div className="max-w-[600px]">
          <button
            onClick={handleAttendanceClick}
            className="px-8 bg-red-100 py-10 rounded-lg text-4xl mr-10"
          >
            Attendance
          </button>
          <button
            onClick={handleClassAudioClick}
            className="px-8 bg-blue-100 py-10 rounded-lg text-4xl"
          >
            Class Audio
          </button>
          <div className="mt-10 flex justify-center gap-10">
            <Link to="https://forms.gle/iGxMKzsg6opCbqML6">
              <button className="px-8 py-10 rounded-lg bg-pink-200 text-4xl">
                Pop quiz
              </button>
            </Link>
            <Link to="https://forms.gle/MV3wt4DKHwxhnAdo9">
              <button className="px-8 py-10 rounded-lg bg-gray-300 text-4xl">
                Evaluation
              </button>
            </Link>
          </div>
          <div className="flex justify-center mt-10 mb-10">
            <Link to="https://digitallibrary.tsu.ge/book/2019/september/books/R-for-Data-Science.pdf">

            <button className="px-8 bg-green-100 py-10 rounded-lg text-4xl">
              Lecture slides
            </button>
            </Link>
          </div>
          <div className="relative">
            <button
              className="px-8 py-4 rounded-xl absolute right-0 group "
              onClick={handleBackButton}
            >
              <FontAwesomeIcon
                className="mr-2 transition-transform transform translate-x-0  group-hover:translate-x-[-4px]"
                icon={faChevronLeft}
              />
              return to home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
