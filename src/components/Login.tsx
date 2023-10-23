import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect} from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
// import Services from "./Services";
import axios from "axios";

const schema = z.object({
  matric_number: z.string().min(3),
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

  // const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (formData: FieldValues) => {
    axios
      .post(
        "https://augumented-classroom.onrender.com/verify-student",
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          console.log(token);
          console.log("Login successful");
        }
      })
      .catch((err) =>
        console.log("An error occurred during authentication: ", err)
      );

    console.log(formData);
    reset();
    // setIsSubmitted(true);
  };

  useEffect(() => {}, []);

  // if (isSubmitted) {
  //   return <Services/>;
  // }

  return (
    <>
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
                <span className="text-gray-600 font-semibold">details</span> to
                gain access to your account
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
                placeholder="Enter your matric_number..."
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
          </form>
          <div>
            <img src="/img.png" className="h-[600px]" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
