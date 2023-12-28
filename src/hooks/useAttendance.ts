import { useMutation } from "react-query";
import APIClient from "../services/api-client";
import { AttendanceData } from "../pages/Attendance";
import useStudentDetailsStore from "../store/useStudentDetails";

import { FormData } from "../pages/SignUp";
interface Register{
  matric_number: string
}
const submitForm = (data: FormData) => {
      const { studentDetails } = useStudentDetailsStore();

  const apiClient = new APIClient<FormData>(
  `/generate-registration-options?matric_number=${data.matric_number}`
);
    const authToken = import.meta.env.VITE_APP_BEARER_TOKEN; 


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
