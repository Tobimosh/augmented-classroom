import { useMutation } from "react-query";
import APIClient from "../services/api-client";
import { AttendanceData } from "../pages/Attendance";

const apiClient = new APIClient<AttendanceData>(
  "/generate-registration-options"
);

const submitForm = (data: AttendanceData) => {
  const authToken = localStorage.getItem("access_token");

  if (!authToken) {
    alert("Authentication token is missing");
    return Promise.reject("Authentication token is missing");
  }

  apiClient.setBearerToken(authToken);

  return apiClient.regAttendance(data);
};

const useAttendance = () => {
  return useMutation({
    mutationFn: submitForm,
    onError: (error) => console.error("Error:", error),
    onSuccess: (data) => console.log("Success:", data),
  });
};

export default useAttendance;
