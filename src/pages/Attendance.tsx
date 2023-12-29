import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import useAuthAttendance from "../hooks/useAuthAttendance";
import { useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";


const Attendance = () => {
  const navigate = useNavigate();
  const authAttendance = useAuthAttendance();
  const [isLoading, setIsLoading] = useState(false)

  const handleBackButton = () => {
    navigate("/services");
  };

  const handleAuthentication = async () => {
    setIsLoading(true);
    await authAttendance.mutate();

    setIsLoading(false)

  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 absolute top-0 left-0">
        <button
          className="px-8 py-4 rounded-xl group"
          onClick={handleBackButton}
        >
          <FontAwesomeIcon
            className="mr-2 transition-transform transform translate-x-0 group-hover:translate-x-[-4px]"
            icon={faChevronLeft}
          />
          Return to Home
        </button>
      </div>

      <div className="flex flex-grow justify-center items-center">
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={handleAuthentication}
            className={`${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-400"
            } text-white flex justify-center items-center rounded-lg px-4 py-3 w-full`}
          >
            {authAttendance.isLoading ? (
              <>
                <RiseLoader
                  color="#ffff"
                  loading={authAttendance.isLoading}
                  size={5}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <span className="ml-2">Authenticating...</span>
              </>
            ) : (
              "Authenticate"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

