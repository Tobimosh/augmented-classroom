import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useAuthAttendance from "../hooks/useAuthAttendance";

const schema = z.object({
  username: z.string().min(3),
});

export type AttendanceData = z.infer<typeof schema>;

const Attendance = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AttendanceData>({ resolver: zodResolver(schema), mode: "onBlur" });
  const [, setData] = useState(null);
  const [, setError] = useState("");
  // const [loading, setLoading] = useState(false);


  //  const attendanceMutation = useAttendance();
  const handleFormSubmit = async (formData: AttendanceData) => {
    console.log(formData);
  //  await attendanceMutation.mutate(formData)
  }

  const authAttendance = useAuthAttendance()
  const handleAuthentication = async () => {
    authAttendance.mutate()
    
  };

  useEffect(() => {}, []);

  const handleBackButton = () => {
    navigate("/services")
  };

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

      <div className="flex h-[100vh] justify-center items-center ">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col p-7 md:w-1/2 h-1/2 bg-gray-200 rounded-xl"
        >
          <label htmlFor="username" className="mb-5">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className="py-3 px-4 border border-gray-400 outline-none"
            placeholder="Enter your username..."
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <div className="flex justify-between mt-7">
            <button type="submit" className="bg-blue-200 rounded-lg px-4 py-3">
              Register
            </button>
            <button
              type="submit"
              onClick={() => handleAuthentication}
              className="bg-red-200 rounded-lg px-4 py-3"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Attendance;
