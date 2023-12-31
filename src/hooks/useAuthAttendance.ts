import { useMutation } from "react-query";
import APIClient from "../services/api-client";


interface AttendanceData{
  username: string
}

const apiClient = new APIClient<AttendanceData>(
  "/generate-authentication-options"
);

const submitForm = () => {
  const authToken = localStorage.getItem("access_token");
  if (!authToken) {
    alert("Authentication token is missing");
    return Promise.reject("Authentication token is missing");
  }

  apiClient.setBearerToken(authToken);

  return apiClient.AuthAttendance();
};

const useAuthAttendance = () => {
  return useMutation({
    mutationFn: submitForm,
    onError: (error) => console.error("Error:", error),
    onSuccess: (data) => console.log("Success:", data),
  });
};

export default useAuthAttendance;
