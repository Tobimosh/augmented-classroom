// import { useMutation } from "react-query";
// import { FormData } from "../pages/SignUp";
// import APIClient from "../services/api-client";
// import { useNavigate } from "react-router-dom";


// const apiClient = new APIClient<FormData>('/create-student')


// const submitForm = (data: FormData) =>
//      apiClient.register(data)

// export const useRegister = () =>{
// const navigate = useNavigate();
//  return	useMutation({
// 		mutationFn: submitForm,
// 		onError: (error) => alert(error),
// 		onSuccess: (data) => {
// 			alert(data)
// 			navigate('/log-in')
// 		}
// 	});
// }


import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ToastOptions, toast } from "react-toastify";
import { FormData } from "../pages/SignUp";
import APIClient from "../services/api-client";


const apiClient = new APIClient<FormData>('/create-student');

const toastStyle: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const submitForm = (data: FormData) => {
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPZmZpY2lhbCB0b2tlbiBmb3IgQXVnbWVudGVkIENsYXNzcm9vbSBjcmVhdGUtc3R1ZGVudCIsImV4cCI6MTcxMzA5ODg2M30.lHXNUKBgIRfTID8RLEhanPjtfT8ChxpHmZT9wErbCIE"; 

  if (!authToken) {
    alert("Authentication token is missing");
    return Promise.reject("Authentication token is missing");
  }

  apiClient.setBearerToken(authToken);

  return apiClient.register(data);
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: submitForm,
    onError: (error) => console.log(error),
    onSuccess: () => {
    //   navigate('/log-in');
	  toast.success('Registration Successful, please log in', toastStyle);

    }
  });
};
