import { useMutation } from "react-query";
import APIClient from "../services/api-client";
import { AttendanceData } from "../pages/Attendance";

const apiClient = new APIClient<AttendanceData>('/generate-registration-options')


const useAttendance = () => useMutation({
    mutationFn: apiClient.regAttendance,
    onError: (error) => console.log(error),
    onSuccess: (data) => console.log(data)
})

export default useAttendance;