import  { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import LoginPage from "./Login"; // Import your login page component
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal, Box, Typography } from "@mui/material";
import {Link} from "react-router-dom"

const schema = z.object({
  matric_number: z.string().min(3),
  password: z.string().min(7),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsModalOpen] = useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 3
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const handleFormSubmit = (formData: FieldValues) => {
    setIsLoading(true);
    axios
      .post("https://augmented-classroom.onrender.com/create-student", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Registration successful");
          reset();
          setIsSignUpSuccessful(true);
          setIsModalOpen(true); // Open the modal
        } else {
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error occurred during registration:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center h-[100vh] items-center">
      {isSignUpSuccessful ? (
        <LoginPage />
      ) : (
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
            <div className="flex items-end text-xs">
              <span className="mr-2">Have an account?</span>
              <Link to="/log-in" className="text-red-300">
                Log in
              </Link>
            </div>
          </form>
          <div>
            <img src="/img.png" className="h-[600px]" alt="" />
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
      {isSignUpSuccessful && (
        <Modal
          open
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey there,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Thanks for signing up!
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default SignUp;

