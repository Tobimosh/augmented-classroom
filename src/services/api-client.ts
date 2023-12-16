// APIClient.ts

import axios, { AxiosInstance } from "axios";
import { ToastOptions, toast } from "react-toastify";

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


  login = (data: T) => {
    return axiosInstance.post(this.endpoint, data)
      .then(res => {
        if (res.status === 200) {
          const { access_token, token_type, refresh_token } = res.data;
          this.setBearerToken(access_token);
          return { access_token, token_type, refresh_token };
        } else {
          return Promise.reject("Login failed");
        }
      })
      .catch(error => {
        toast.error('Error:', error);
        throw error;
      });
  };
}

export default APIClient;
