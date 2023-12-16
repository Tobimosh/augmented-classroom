import { useMutation } from "react-query";
import { FormData } from "../pages/SignUp";
import APIClient from "../services/api-client";
import { useNavigate } from "react-router-dom";


const apiClient = new APIClient<FormData>('/create-student')


const submitForm = (data: FormData) =>
     apiClient.register(data)

export const useRegister = () =>{
const navigate = useNavigate();
 return	useMutation({
		mutationFn: submitForm,
		onError: (error) => alert(error),
		onSuccess: (data) => {
			alert(data)
			navigate('/log-in')
		}
	});
}