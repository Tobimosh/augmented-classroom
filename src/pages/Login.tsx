import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import Logo from "../components/Logo";
import { useLogin } from "../hooks/useLogin";
import useStudentDetailsStore, { StudentDetails } from "../store/useStudentDetails";



const schema = z.object({
  matric_number: z
    .string()
    .min(9, { message: "Matric number must be at least 9 characters" }),
  password: z
    .string()
    .min(7, { message: "Password must contain at least 7 characters" }),
});

export type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useLogin();

  localStorage.setItem("isLoggedIn", "false");
  const {setUserDetails, studentDetails} = useStudentDetailsStore();


  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (isValid) {
        await mutate(formData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem('studentDetails', JSON.stringify(formData))
        setUserDetails(formData as StudentDetails)
      }
    } catch (error) {
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
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
      <div className="flex  flex-col items-center  min-h-screen">
        <Logo width={100} />
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
              autoComplete="on"
              className="w-full py-3 px-2 border text-xs hover:outline-1 border-gray-400 outline-none focus:border-blue-500 rounded-lg"
              placeholder="Matric Number"
            />

            {errors.matric_number && (
              <p className="text-red-500">{errors.matric_number.message}</p>
            )}
          </div>

          <div className="lg:mb-20 mb-10 relative">
            <label htmlFor="password" className="block mb-1 text-xs">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                autoComplete="on"
                className="w-full py-3 px-2 border text-xs border-gray-400 outline-none focus:border-blue-500 rounded-lg pr-8"
                placeholder="***"
              />

              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400"
              } text-white flex justify-center items-center rounded-lg px-4 py-3 w-full`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <HashLoader
                    color="#ffff"
                    loading={isLoading}
                    size={25}
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
    </>
  );
};

export default Login;
