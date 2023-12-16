

import axios, { AxiosInstance } from "axios";
import { ToastOptions, toast } from "react-toastify";


// console.log(import.meta.env.VITE_API_URL)
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
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
  authToken: string | null = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  setBearerToken(token: string) {
    this.authToken = token;
  }

  register = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data, {
      headers: {
        Authorization: this.authToken ? `Bearer ${this.authToken}` : '',
      },
    })
    .then(res => {
        if (res.status === 200) {
            toast.success("SUCCESS!!", toastStyle);
        }
        return res.data;
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("I'm afraid you put in the wrong details", toastStyle);
          } else if (error.response.status === 400) {
            toast.error("Student with that details already exists", toastStyle);
          }
        } else if (error.request) {
          toast.error("No response from the server", toastStyle);
        } else {
          toast.error("Error in request setup", toastStyle);
        }
        console.error('Error:', error);
        throw error;
      });
  }
}

export default APIClient;

