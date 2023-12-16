import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegister } from "../hooks/useRegister";

const schema = z.object({
  matric_number: z.string().min(3),
  password: z.string().min(7),
});

export type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });



  const { mutate, data } = useRegister();

  const handleFormSubmit = (formData: FormData) => {
    setIsLoading(true);
    if (isValid) {
      mutate(formData);
      reset();
    }
    setIsLoading(false)
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center h-[100vh] items-center">
        <div className="flex items-center gap-10 bg-red-100">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col p-7 md:w-1/2 h-1/2 rounded-xl"
          >
            <div className="mb-5">
              <h2 className="text-3xl">Let's sign you up!</h2>
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
                {...register("password")}
                className="py-3 px-4 border border-gray-400 mt-5 outline-none w-full rounded-lg"
                placeholder="********"
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="flex justify-between mt-7 mb-5">
              <button
                type="submit"
                className="bg-blue-200 w-full rounded-lg px-4 py-3"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-end text-sm">
              <span className="mr-2">Have an account?</span>
              <Link to="/log-in" className="text-red-500">
                Log in
              </Link>
            </div>
          </form>
          <div>
            <img src="/students.jpeg" className="h-[600px]" alt="" />
          </div>
        </div>
        
        {isLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </>
  );
};

export default SignUp;
