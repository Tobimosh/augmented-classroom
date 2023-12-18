import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useRegister } from "../hooks/useRegister";

const schema = z.object({
  matric_number: z.string().min(3),
  password: z.string().min(7),
});

export type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const { mutate, isLoading } = useRegister();
  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (isValid) {
        await mutate(formData);
        reset();
      }
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col items-center min-h-screen">
        <div className="flex items-center">
          <img className="mb-8 mt-8" width={100} src="/bulb.png" alt="" />
          <span className="lg:text-3xl text-xl boldPoppins text-blue-500">VirtuLearn</span>
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-7 w-full max-w-xl poppins"
        >
          <p className="lg:text-3xl text-xl font-bold mb-10 text-center boldPoppins">
            Sign up and let's get started!
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
              className="bg-blue-500 text-white flex justify-center items-center rounded-lg px-4 py-3 w-full"
            >
              {isLoading ? (
                <>
                  <ClipLoader
                    color="#ffff"
                    loading={isLoading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="ml-2">Signing up...</span>
                </>
              ) : (
                "Sign up"
              )}
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
    </>
  );
};

export default SignUp;
