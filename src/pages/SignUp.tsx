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

              <div className="flex items-center justify-center min-h-screen">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="p-7 w-full max-w-xl"
          >
            <p className="text-xl font-bold mb-5 text-center">
              Sign Up and lets get you started!
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

            <div className="mb-5">
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
                className="bg-blue-500 text-white rounded-lg px-4 py-3 w-full"
              >
                Sign up
              </button>
            </div>

            <div className="flex justify-center text-sm mt-4">
              <span className="mr-2">Already have an account?</span>
              <Link to="/log-in" className="text-blue-500">
                Log in
              </Link>
            </div>
          </form>
        </div>

        
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

export default SignUp;
