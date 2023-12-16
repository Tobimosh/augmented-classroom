// import { useMutation } from "react-query";
// import { FormData } from "../pages/SignUp";
// import APIClient from "../services/api-client";
// import { useNavigate } from "react-router-dom";
// import { ToastOptions, toast } from "react-toastify";

// const apiClient = new APIClient<FormData>("/verify-student");

// const toastStyle: ToastOptions = {
//   position: 'top-right',
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: 'light',
// };

// const submitForm = (data: FormData) => {

//   const authToken = import.meta.env

//   if(!authToken){
//     toast.error("Authentication token is missing")
//     return Promise.reject("Authentication token is missing")
//   }
//   return apiClient.register(data);

// };

// export const useLogin = () =>{
//   const navigate = useNavigate();
//   return useMutation({

//     mutationFn: submitForm,
//     onError: (error) => alert(error),
//     onSuccess: (data) => {
//       alert(data);
//       navigate('/services')
//     }
//   },

//   );
// }

// useLogin.ts

import { useMutation } from "react-query";
import APIClient from "../services/api-client";
import { json, useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import { FormData } from "../pages/Login";

const apiClient = new APIClient("/verify-student");

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
      // Assuming you want to do something with the data on successful login
      toast.success("Login Successful", toastStyle);
      localStorage.setItem("user", JSON.stringify(data))
      console.log("Login successful!");
      navigate('/services');
    },
  });

  return mutation;
};
