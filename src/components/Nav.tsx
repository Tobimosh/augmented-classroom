import GridViewIcon from "@mui/icons-material/GridView";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";
interface Props {
  matric_num: string;
  children: React.ReactNode
}

const Nav = ({matric_num, children}: Props) => {
  const navigate = useNavigate()
  return (
    <div className="h-screen min-h-screen flex max-h-[100%] justify-between w-full ">
      <div className="w-fit bg-white flex flex-col items-center   pt-10 pb-10 text-gray-500 ">
        <div className="flex flex-col justify-between h-full  gap-y-10">
          <div className="h-1/3 flex flex-col justify-between items-center">
            <div className="text-sm border-t-2 border-b-2 p-5 ">
              <span>
                <PersonIcon />
                {matric_num}
              </span>
            </div>
            <GridViewIcon />

            <FingerprintIcon />
          </div>

          <button className="cursor-pointer" onClick={() => {localStorage.removeItem("user"); navigate("/log-in")}} title="Log out">
   
              <ExitToAppIcon />
     
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-scroll p-5 flex-1 ">{children}</div>
    </div>
  );
};

export default Nav;
