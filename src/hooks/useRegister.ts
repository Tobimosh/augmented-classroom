import { useMutation } from "react-query";
import { FormData } from "../pages/SignUp";
import APIClient from "../services/api-client";


const apiClient = new APIClient<FormData>('/create-student')


const submitForm = (data: FormData) =>
     apiClient.register(data)

export const useRegister = () =>
	useMutation({
		mutationFn: submitForm,
		onError: (error) => alert(error),
		onSuccess: (data) => alert(data),
	});