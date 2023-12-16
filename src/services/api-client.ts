import axios from "axios";
import { ToastOptions, toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: 'https://augmented-classroom.onrender.com'
});


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

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  register = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then(res => {
      if (res.status === 404) {
        toast.error("I'm afraid you put in the wrong details", toastStyle);
      } else if (res.status === 400) {
        toast.error("Student with that details already exists", toastStyle);
      } else if (res.status === 200) {
        toast.success("SUCCESS!!", toastStyle);
      }
      return res.data; 
    })
  }
}

export default APIClient;
