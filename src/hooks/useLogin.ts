import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import { FormData } from "../pages/Login";
import APIClient from "../services/api-client";

export const apiClient = new APIClient("/verify-student");

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

const submitLogin = async (data: FormData) => {
  try {
    const response = await apiClient.login(data);
    localStorage.setItem("access_token", response.access_token);
    return response;
  } catch (error) {
    throw error;
  }
};

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: submitLogin,
    onError: (error) => {
      toast.error(
        "Login failed. Please check your credentials and try again.",
        toastStyle
      );
      console.error("Error:", error);
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));

      setTimeout(() => {
        navigate("/services");
      }, 1000);
    },
  });

  return mutation;
};

