import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import { FormData } from "../pages/SignUp";
import APIClient from "../services/api-client";
import useAttendance from "./useAttendance";

const apiClient = new APIClient<FormData>("/create-student");

const toastStyle: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const submitForm = (data: FormData) => {
  const authToken = import.meta.env.VITE_APP_BEARER_TOKEN;

  if (!authToken) {
    alert("Authentication token is missing");
    return Promise.reject("Authentication token is missing");
  }

  apiClient.setBearerToken(authToken);

  return apiClient.register(data);
};

export const useRegister = () => {
  const navigate = useNavigate();
  const attendanceMutation = useAttendance();

  return useMutation({
    mutationFn: submitForm,
    onError: (error) => console.log(error),
    onSuccess: async (data) => {
      console.log("Registration Data:", data);

      toast.success("Registration Successful, please log in", toastStyle);

      const { matric_number, password } = data;
      await attendanceMutation.mutate({
        matric_number,
        password,
      });

      setTimeout(() => {
        navigate("/log-in");
      }, 3000);
    },
  });
};
