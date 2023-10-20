import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Services from "./Services";

const schema = z.object({
  username: z.string().min(3),
});
type FormData = z.infer<typeof schema>;

const Attendance = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });
  const [, setData] = useState(null);
  const [, setError] = useState("");
  const [page, setPage] = useState("attendance");
  // const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData: FieldValues) => {
    console.log(formData);

    try {
      const response = await axios.get('https://augumented-classroom.onrender.com/generate-registration-options?matric_number=21CG029882')

      const registrationOptions = JSON.parse(response.data);
      console.log(registrationOptions);
      setData(registrationOptions);

      const registrationResponse = await startRegistration(registrationOptions);
      console.log(registrationResponse);

      await axios.post(
        "https://augumented-classroom.onrender.com/verify-registration-response?matric_number=21CG029882",
        registrationResponse
      );

      reset();
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleAuthentication = async () => {
    try {
      const response = await axios.get(
        `https://augumented-classroom.onrender.com/generate-authentication-options?matric_number=21CG029882`
      );

      const authenticationOptions = JSON.parse(response.data);
      console.log(authenticationOptions);
      setData(authenticationOptions);

      const authenticationResponse = await startAuthentication(
        authenticationOptions
      );
      console.log(authenticationResponse);

      await axios.post(
        "https://augumented-classroom.onrender.com/verify-authentication-response?matric_number=21CG029882",
        authenticationResponse
      );

      reset();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {}, []);

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
              onClick={handleAuthentication}
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
