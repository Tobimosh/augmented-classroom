


import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudentDetailsStore from "../store/useStudentDetails";
import Logo from "./Logo";

interface Props {
  children: React.ReactNode;
}

const Nav = ({ children }: Props) => {
  const { studentDetails } = useStudentDetailsStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="lg:flex lg:flex-row h-screen  w-full bg-gray-100">
      <div className="lg:hidden flex justify-center border-b border-slate-900 bg-white py-2">
        <Logo width={50} />
      </div>

      <div className="lg:hidden bg-white flex justify-between items-center p-3">
        <GridViewIcon />

        <div className="relative">
          <button
            className="cursor-pointer flex items-center space-x-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <PersonIcon />
            <span>{studentDetails.matric_number}</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
              <button
                className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("refresh_token");
                  localStorage.setItem("isLoggedIn", "false");
                  navigate("/log-in");
                  setShowDropdown(false);
                }}
                title="Log out"
              >
                <ExitToAppIcon />
                <span className="ml-2">Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="lg:flex lg:w-1/5 bg-white flex-col items-center text-gray-500 hidden">
        <div className="lg:flex justify-center border-b border-slate-900 p-2">
          <Logo width={50} />
        </div>

        <div className="lg:h-full flex flex-col justify-between items-center">
          <div className="text-sm p-5 flex items-center">
            <PersonIcon className="mr-2" />
            <span>{studentDetails.matric_number}</span>
          </div>
          {/* <FingerprintIcon /> */}
          <div className="mb-5">
            <button
              className="cursor-pointer text-sm mt-2"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.setItem("isLoggedIn", "false");
                navigate("/log-in");
              }}
              title="Log out"
            >
              <ExitToAppIcon />
              <span className="ml-2">Log out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="lg:flex-1 h-full p-5 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default Nav;



