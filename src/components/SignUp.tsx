// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import { z } from "zod";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // import Form from "./Login";

// const schema = z.object({
//   matric_number: z.string().min(3),
//   password: z.string().min(7),
// });

// type FormData = z.infer<typeof schema>;

// const SignUp = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });


//   const handleFormSubmit = (formData: FieldValues) => {
//     axios
//       .post(
//         "https://augumented-classroom.onrender.com/create-student",
//         formData
//       )
//       .then((response) => {
//         if (response.status === 200) {
//           console.log("Registration successful");
//           reset();
//         } else {
//           console.error("Registration failed");
//         }
//       })
//       .catch((error) => {
//         console.error("Error occurred during registration:", error);
//       });

//       console.log(formData)
//     reset();
//   };

//   useEffect(() => {}, []);


//   return (
//     <>
//       <div className="flex  justify-center h-[100vh]  items-center ">
//         <div className="flex items-center gap-10 bg-red-100">
//           <form
//             onSubmit={handleSubmit(handleFormSubmit)}
//             className="flex flex-col p-7 md:w-1/2 h-1/2 rounded-xl"
//           >
//             <div className="mb-5">
//               <h2 className="text-3xl ">Idan! Oya sign up</h2>
//             </div>
//             <div className="mb-5 flex flex-col">
//               <label htmlFor="username" className="mb-5">
//                 Matric Number
//               </label>
//               <input
//                 type="text"
//                 {...register("matric_number")}
//                 className="py-3 px-4 border border-gray-400 outline-none rounded-lg"
//                 placeholder="Enter your username..."
//               />
//               {errors.matric_number && (
//                 <p className="text-red-500">{errors.matric_number.message}</p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 {...register("password")}
//                 className="py-3 px-4 border border-gray-400 mt-5 outline-none w-full rounded-lg"
//                 placeholder="***"
//               />
//             </div>
//             {errors.password && (
//               <p className="text-red-500">{errors.password.message}</p>
//             )}
//             <div className="flex justify-between mt-7 mb-5">
              
//                 <button
//                   type="submit"
//                   className="bg-blue-200 w-full rounded-lg px-4 py-3">
//                   Sign Up
//                 </button>
//             </div>

//             <div className=" flex items-end text-xs">
//               <span className="mr-2">Have an account?</span>
//               <Link to="/log-in" className="text-red-300">
//                 Log in
//               </Link>
//             </div>
//           </form>
//           <div>
//             <img src="/img.png" className="h-[600px]" alt="" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;


import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import LoginPage from "./Login"; // Import your login page component

const schema = z.object({
  matric_number: z.string().min(3),
  password: z.string().min(7),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const handleFormSubmit = (formData: FieldValues) => {
    axios
      .post(
        "https://augumented-classroom.onrender.com/create-student",
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Registration successful");
          reset();
          setIsSignUpSuccessful(true);
        } else {
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error occurred during registration:", error);
      });

    console.log(formData);
    reset();
  };

  return (
    <div className="flex  justify-center h-[100vh]  items-center">
      {isSignUpSuccessful ? (
        <LoginPage /> // Render the login page component when sign-up is successful
      ) : (
        <div className="flex items-center gap-10 bg-red-100">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col p-7 md:w-1/2 h-1/2 rounded-xl"
          >
            <div className="mb-5">
              <h2 className="text-3xl ">Idan! Oya sign up</h2>
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
            <div className="flex items-end text-xs">
              <span className="mr-2">Have an account?</span>
              <a href="/log-in" className="text-red-300">
                Log in
              </a>
            </div>
          </form>
          <div>
            <img src="/img.png" className="h-[600px]" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;

