import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import Services from "./Services";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(7),
});

type FormData = z.infer<typeof schema>;



const Form = () => {
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
    return <Services/>;
  }

  return (
    <>

    
    <div className="flex h-[100vh] justify-center items-center">

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col p-7 md:w-1/2 h-1/2 bg-gray-200 rounded-xl"
      >
        <div className="mb-5 flex flex-col">
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
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            className="py-3 px-4 border border-gray-400 mt-5 outline-none w-full"
            placeholder="***"
          />
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className="flex justify-between mt-7">
          <button type="submit" className="bg-blue-200 rounded-lg px-4 py-3">
            Login
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Form;
