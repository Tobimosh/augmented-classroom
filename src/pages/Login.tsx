// import { zodResolver } from "@hookform/resolvers/zod";
// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import HashLoader from "react-spinners/HashLoader";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { z } from "zod";
// import { useLogin } from "../hooks/useLogin";
// import StudentContext from "../context/studentContext";

// const schema = z.object({
//   matric_number: z
//     .string()
//     .min(9, { message: "Matric number must be at least 9 characters" }),
//     // .max(10, {
//     //   message: "Matric number should not be more than 10 characters",
//     // }),
//   password: z
//     .string()
//     .min(7, { message: "Password must contain at least 7 characters" }),
// });

// export type FormData = z.infer<typeof schema>;

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
    
//   } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [, setFormData] = useState<FormData>({
//     matric_number: "",
//     password: "",
//   });

//   const {mutate, isLoading, error} = useLogin();

//   localStorage.setItem('isLoggedIn', 'false')

//   const { dispatch } = useContext(StudentContext);

//   const handleFormSubmit = (formData: FormData) => {
//       dispatch({ type: "SET_MATRIC_NUMBER", payload: formData.matric_number });
//       dispatch({ type: "SET_PASSWORD", payload: formData.password });

//     setFormData((prevData) => ({
//       ...prevData,
//       ...formData,
//     }));

//      if (isValid) {
//        setFormData(formData)
//        mutate(formData);
//      }
//      if(error){
//       localStorage.setItem('isLoggedIn', 'true')
//       setIsLoggedIn(true)
      
//      }
//   };


//   useEffect(() => {
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     if (storedIsLoggedIn === "true") {
//       setIsLoggedIn(true);
//     }
//   }, []);



//   return (
//     <>
//       <ToastContainer />

//       <div className="flex  flex-col items-center  min-h-screen">
//         <div className="flex items-center">
//           <img className="mb-8 mt-8" width={100} src="/bulb.png" alt="" />
//           <span className="lg:text-3xl text-xl boldPoppins text-blue-500">
//             VirtuLearn
//           </span>
//         </div>
//         <form
//           onSubmit={handleSubmit(handleFormSubmit)}
//           className="p-7 w-full max-w-xl poppins"
//         >
//           <p className="lg:text-3xl text-xl font-bold mb-10 text-center boldPoppins">
//             Log in to your account
//           </p>

//           <div className="mb-5">
//             <label htmlFor="matric_number" className="block mb-1 text-xs">
//               Matric Number
//             </label>
//             <input
//               type="text"
//               {...register("matric_number")}
//               className="w-full py-3 px-2 border text-xs hover:outline-1 border-gray-400 outline-none focus:border-blue-500 rounded-lg"
//               placeholder="Matric Number"
//             />
//             {errors.matric_number && (
//               <p className="text-red-500">{errors.matric_number.message}</p>
//             )}
//           </div>

//           <div className="lg:mb-20 mb-10">
//             <label htmlFor="password" className="block mb-1 text-xs">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password")}
//               className="w-full py-3 px-2 border text-xs border-gray-400 outline-none focus:border-blue-500 rounded-lg"
//               placeholder="***"
//             />
//             {errors.password && (
//               <p className="text-red-500">{errors.password.message}</p>
//             )}
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className={`${
//                 isLoading
//                   ? "bg-blue-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-400"
//               } text-white flex justify-center items-center rounded-lg px-4 py-3 w-full`}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <HashLoader
//                     color="#ffff"
//                     loading={isLoading}
//                     size={25}
//                     aria-label="Loading Spinner"
//                     data-testid="loader"
//                   />
//                   <span className="ml-2">Authenticating...</span>
//                 </>
//               ) : (
//                 "Log in"
//               )}
//             </button>
//           </div>

//           <div className="flex justify-center text-sm mt-4">
//             <span className="mr-2">Don't have an account?</span>
//             <Link to="/sign-up" className="text-blue-500">
//               Sign Up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;



import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useLogin } from "../hooks/useLogin";
import StudentContext from "../context/studentContext";

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
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useLogin();
  localStorage.setItem("isLoggedIn", "false");
  const { dispatch } = useContext(StudentContext);

  const handleLogin = async (formData: FormData) => {
    try {
      dispatch({
        type: "SET_MATRIC_NUMBER",
        payload: { matric_number: formData.matric_number },
      });
      dispatch({
        type: "SET_PASSWORD",
        payload: { password: formData.password },
      });

      await mutate(formData);

      // The rest of your logic after successful login
    } catch (error) {
      console.error("Login error:", error);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    // Check for stored login state on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col items-center min-h-screen">
        <form
          onSubmit={handleSubmit(handleLogin)}
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
