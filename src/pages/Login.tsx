import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import ClipLoader from "react-spinners/ClipLoader";

const schema = z.object({
  matric_number: z.string().min(10, {message: 'Matric number must contain at least 10 characters'}),
  password: z.string().min(7, {message: 'Password must contain at least 7 characters'}),
});

export type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate()

  const [, setFormData] = useState<FormData>({
    matric_number: "",
    password: "",
  });



  const verifyStudent = useLogin();

  const handleFormSubmit = (formData: FormData) => {

    setFormData((prevData) => ({
      ...prevData,
      ...formData,
    }));

     if (isValid) {
       verifyStudent.mutate(formData);
       reset();
     }
   
  };


  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {isLoggedIn && (
        <div className="flex  flex-col items-center  min-h-screen">
          <div className="flex items-center">

            <img className="mb-8 mt-8" width={100} src="/bulb.png" alt="" />
          </div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="p-7 w-full max-w-xl poppins"
            >
              <p className="lg:text-3xl text-xl font-bold mb-10 text-center boldPoppins">
                Log in to your account
              </p>

              <div className="mb-5">
                <label htmlFor="matric_number" className="block mb-1 text-xs">
                  Matric Number
                </label>
                <input
                  type="text"
                  {...register("matric_number")}
                  className="w-full py-3 px-2 border text-xs hover:outline-1 border-gray-400 outline-none focus:border-blue-500 rounded-lg"
                  placeholder="Matric Number"
                />
                {errors.matric_number && (
                  <p className="text-red-500">{errors.matric_number.message}</p>
                )}
              </div>

              <div className="lg:mb-20 mb-10">
                <label htmlFor="password" className="block mb-1 text-xs">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full py-3 px-2 border text-xs border-gray-400 outline-none focus:border-blue-500 rounded-lg"
                  placeholder="***"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-400 rounded-lg px-4 py-3 w-full"
                >
                  {verifyStudent.isLoading ? (
                    <>
                      <ClipLoader
                        color="#ffff"
                        loading={verifyStudent.isLoading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                      <span className="ml-2">Authenticating...</span>
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>

              <div className="flex justify-center text-sm mt-4">
                <span className="mr-2">Don't have an account?</span>
                <Link to="/sign-up" className="text-blue-500">
                  Sign Up
                </Link>
              </div>
            </form>
        </div>
      )}
    </>
  );
};

export default Login;
