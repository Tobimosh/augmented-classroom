import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Services from "./Services";
import { useState } from "react";


const ClassAudio = () => {
  const [page, setPage] = useState("classaudio")

    const handleBackButton = () => {
      setPage("services");
    };
    if (page === "services") {
      return <Services />;
    }
  return (
    <>
      <div className="relative">
        <button
          className="px-8 py-4 rounded-xl absolute left-10 group "
          onClick={handleBackButton}
        >
          <FontAwesomeIcon
            className="mr-2 transition-transform transform translate-x-0  group-hover:translate-x-[-4px]"
            icon={faChevronLeft}
          />
          return to home
        </button>
      </div>

      <div className="h-[100vh] flex justify-center items-center">
        <img src="/src/assets/audio.jpg" alt="" />
      </div>
    </>
  );
}

export default ClassAudio
