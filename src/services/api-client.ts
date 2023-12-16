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


  // login = (data: T) => {
  //   return axiosInstance.post(this.endpoint, data)
  //     .then(res => {
  //       if (res.status === 200) {
  //         const { access_token, token_type, refresh_token } = res.data;
  //         this.setBearerToken(access_token);
  //         return { access_token, token_type, refresh_token };
  //       } else {
  //         return Promise.reject("Login failed");
  //       }
  //     })
  //     .catch(error => {
  //       toast.error('Error:', error);
  //       throw error;
  //     });
  // };

login = (data: T) => {
    return axiosInstance.post(this.endpoint, data)
      .then(res => {
        if (res.status === 200) {
          const { access_token, token_type, refresh_token, expires_in } = res.data;
          this.setBearerToken(access_token);

          // Store tokens in local storage
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          // Calculate token expiration time in milliseconds
          const expirationTime = expires_in * 1000;

          // Check if the token is about to expire (e.g., within next 4 minutes)
          const currentTime = Math.floor(Date.now() / 1000);
          if (expirationTime - currentTime < 240) {
            // Token is about to expire, initiate token refresh
            return this.refreshToken().then(newAccessToken => {
              return { access_token: newAccessToken, token_type, refresh_token };
            });
          } else {
            return { access_token, token_type, refresh_token };
          }
        } else {
          return Promise.reject("Login failed");
        }
      })
      .catch(error => {
        toast.error('Error:', error);
        throw error;
      });
  };


    refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    console.log(refreshToken)

    if (!refreshToken) {
      throw new Error('Refresh token not available');
    }

    try {
      const response = await axiosInstance.post('/refresh', {
        refresh_token: refreshToken,
      });

      const newAccessToken = response.data.access_token;
      this.setBearerToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
}

export default APIClient;
