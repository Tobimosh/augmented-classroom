// import { useState } from "react";
// import Attendance from "./Attendance";
// import ClassAudio from "./ClassAudio";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import Login from "./Login";
// import Card from "./Card";
// import { Link } from "react-router-dom";

// const Services = () => {
//   const [service, setServices] = useState("");

//   // const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleAttendanceClick = () => {
//     //   setIsSubmitted(true);
//     setServices("attendance");
//   };
//   const handleClassAudioClick = () => {
//     setServices('classAudio')
//   }
//   // const handleBackButton = () => {
//   //   setServices("login")
//   // }

//   if (service === "attendance") {
//     return <Attendance />;
//   }
//   if (service === "classAudio") {
//     return <ClassAudio/>
//   }
//   if(service === "login"){
//     return <Login/>
//   }

//   return (
//     <>
//       <div className="w-[100vw] flex justify-center">
//         <h2 className="text-6xl">AUGMENTED CLASSROOM</h2>
//       </div>
//       <div className="h-[90vh] flex justify-center items-center w-full">
 
//         <Card
//           imageUrl="/attendance.jpeg"
//           name="Attendance"
//           onClick={handleAttendanceClick}
//         />
//         <Card
//           imageUrl="/attendance.jpeg"
//           name="Class Audio"
//           onClick={handleClassAudioClick}
//         />{" "}
//         <Link to={"https://forms.gle/iGxMKzsg6opCbqML6"}>
//           <Card imageUrl="/pop-quiz.jpeg" name="Take Pop Quiz" />{" "}
//         </Link>
//         <Link to={"https://forms.gle/MV3wt4DKHwxhnAdo9"}>
//           <Card imageUrl="/attendance.jpeg" name="Lecturer Evaluation" />
//         </Link>
//         <Card
//           imageUrl="/attendance.jpeg"
//           onClick={handleClassAudioClick}
//           name="Audio Visual"
//         />{" "}
//         {/* <Card imageUrl="/attendance.jpeg" name="" /> */}
//         {/* <div className="relative">
//           <button
//             className="px-8 py-4 rounded-xl absolute right-0 group "
//             onClick={handleBackButton}
//           >
//             <FontAwesomeIcon
//               className="mr-2 transition-transform transform translate-x-0  group-hover:translate-x-[-4px]"
//               icon={faChevronLeft}
//             />
//             return to home
//           </button>
//         </div> */}
//       </div>
//     </>
//   );
// };

// export default Services;

import { useState } from "react";
import Attendance from "./Attendance";
import ClassAudio from "./ClassAudio";
import Login from "./Login";
import Card from "./Card";
import { Link } from "react-router-dom";

const Services = () => {
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
      <div className=" flex justify-center items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <Link to="/attendance">

          <Card
            imageUrl="/attendance.jpeg"
            name="Attendance"
            onClick={handleAttendanceClick}
          />
          </Link>

          <Link to="https://forms.gle/iGxMKzsg6opCbqML6">
            <Card imageUrl="/pop-quiz.jpeg" name="Take Pop Quiz" />
          </Link>
          <Link to="https://forms.gle/MV3wt4DKHwxhnAdo9">
            <Card imageUrl="/evaluation.jpeg" name="Lecturer Evaluation" />
          </Link>
          <Card
            imageUrl="/attendance.jpeg"
            name="Audio Visual"
            onClick={handleClassAudioClick}
          />
        </div>
      </div>
    </>
  );
};

export default Services;

