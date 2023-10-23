import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import Services from "./Services";
// import { Link } from "react-router-dom";
// import Form from "./Login";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(7),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (formData: FieldValues) => {
    console.log(formData);
    reset();
    setIsSubmitted(true);
  };

  useEffect(() => {}, []);

  if (isSubmitted) {
    return <Services />;
  }

  return (
    <>
      <div className="flex  justify-center h-[100vh] items-center ">
        <div className="flex items-center">

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col p-7 md:w-1/2 h-1/2 rounded-xl"
        >
          <div>
            <h2>Idan! Oya sign up</h2>
          </div>
          <div className="mb-5 flex flex-col">
            <label htmlFor="username" className="mb-5">
              Matric Number
            </label>
            <input
              type="text"
              {...register("username")}
              className="py-3 px-4 border border-gray-400 outline-none rounded-lg"
              placeholder="Enter your username..."
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
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
              className="bg-blue-200 w-full rounded-lg px-4 py-3"
            >
              Sign Up
            </button>
          </div>

          <div className="">
            <span>Have an account?</span>
            {/* <Link to={Form}>Log in</Link> */}
          </div>
        </form>
        <div>
          <img src="/img.png" className="h-[600px]" alt="" />
        </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
