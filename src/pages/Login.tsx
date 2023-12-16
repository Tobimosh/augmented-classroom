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

const schema = z.object({
  matric_number: z.string().min(3),
  password: z.string().min(7),
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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
     if (isValid) {
       verifyStudent.mutate(formData);
       reset();
     }
     setIsLoading(false);
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
        <div className=" flex justify-center h-[100vh]  items-center">
          <div className="flex items-center gap-10 bg-red-100">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col p-7 md:w-1/2 h-1/2 rounded-xl"
            >
              <div className="mb-5">
                <h2 className="text-3xl mb-">Welcome!</h2>
                <p className="text-sm">
                  Enter your{" "}
                  <span className="text-gray-600 font-semibold">details</span>{" "}
                  to gain access to your account
                </p>
              </div>
              <div className="mb-5 flex flex-col">
                <label htmlFor="matric_number" className="mb-5">
                  Matric Number
                </label>
                <input
                  type="text"
                  {...register("matric_number")}
                  className="py-3 px-4 border border-gray-400 outline-none rounded-lg"
                  placeholder="Enter your matric number..."
                />
                {errors.matric_number && (
                  <p className="text-red-500">{errors.matric_number.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  // onChange={handlePasswordChange("password")}
                  {...register("password")}
                  className="py-3 px-4 border border-gray-400 mt-5 outline-none w-full rounded-lg"
                  placeholder="***"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="flex justify-between mt-7">
                <button
                  type="submit"
                  className="bg-blue-200 rounded-lg w-full px-4 py-3"
                >
                  Login
                </button>
              </div>
              <div className="flex items-end text-sm mt-4">
                <span className="mr-2">Don't have an account?</span>
                <Link to="/sign-up" className="text-red-500">
                Sign Up
                </Link>
              </div>
            </form>
            <div>
              <img src="/students.jpeg" className="object-cover w-fit hidden lg:block" alt="" />
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Login;
