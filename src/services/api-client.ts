// APIClient.ts

import axios, { AxiosInstance } from "axios";
import { ToastOptions, toast } from "react-toastify";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const toastStyle: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

class APIClient<T> {
  endpoint: string;
  authToken: string | null = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.checkAndRefreshToken();
  }

  setBearerToken(token: string) {
    this.authToken = token;
  }

  register = (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers: {
          Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("SUCCESS!!", toastStyle);
        }
        return res.data;
      })
      .catch((error) => {
        this.handleRequestError(error);
        throw error;
      });
  };

  login = (data: T) => {
    return axiosInstance
      .post(this.endpoint, data)
      .then((res) => {
        if (res.status === 200) {
          const { access_token, token_type, refresh_token, expires_in } =
            res.data;
          this.setBearerToken(access_token);

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          const expirationTime = 2 * 60 * 1000;

          const currentTime = performance.now();
          if (expirationTime - currentTime < 90 * 1000) {
            return this.refreshToken().then((newAccessToken) => {
              return {
                access_token: newAccessToken,
                token_type,
                refresh_token,
              };
            });
          } else {
            return { access_token, token_type, refresh_token };
          }
        } else {
          return Promise.reject("Login failed");
        }
      })
      .catch((error) => {
        this.handleRequestError(error);
        throw error;
      });
  };

  refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("Refresh token not available");
    }

    try {
      const response = await axiosInstance.post("/refresh", {
        refresh_token: refreshToken,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      const newAccessToken = response.data.access_token;
      this.setBearerToken(newAccessToken);

      setTimeout(this.checkAndRefreshToken.bind(this), 90 * 1000);

      return newAccessToken;
    } catch (error) {
      this.handleRequestError(error);
      throw error;
    }
  };

  private checkAndRefreshToken = () => {
    const expirationTime = 2 * 60 * 1000;
    const currentTime = performance.now();
    if (expirationTime - currentTime < 90 * 1000) {
      this.refreshToken().catch((error) => {
        console.error("Error refreshing token:", error);
      });
    } else {
      setTimeout(this.checkAndRefreshToken.bind(this), 90 * 1000);
    }
  };

  private handleRequestError = (error: any) => {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("I'm afraid you put in the wrong details", toastStyle);
      } else if (error.response.status === 400) {
        toast.error(
          "Student with that details already exists",
          toastStyle
        );
      }
    } else if (error.request) {
      toast.error("No response from the server", toastStyle);
    } else {
      toast.error("Error in request setup", toastStyle);
    }
    console.error("Error:", error);
  };
}

export default APIClient;
