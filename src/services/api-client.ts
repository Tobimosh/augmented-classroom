import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import axios, { AxiosInstance } from "axios";
import { ToastOptions, toast } from "react-toastify";

import { FormData } from "../pages/SignUp";
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
  isRefreshing: boolean = false;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.setupTokenRefresh();
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
        if (error.response && error.response.status === 409) {
          toast.error("Student already exists", toastStyle);
        } else {
          toast.error(`${error.message}`, toastStyle);
          console.error("Error:", error);
        }
        throw error;
      });
  };

  login = (data: T) => {
    return axiosInstance
      .post(this.endpoint, data)
      .then((res) => {
        if (res.status === 200) {
          const { access_token, token_type, refresh_token } = res.data;
          this.setBearerToken(access_token);
          toast.success("Login Successful", toastStyle);

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          return { access_token, token_type, refresh_token };
        } else {
          return Promise.reject("Login failed");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Wrong Matric number or password", toastStyle);
        }
        if (error.response && error.response.status === 403) {
          toast.error(
            "Sorry, your sign up process was incomplete, please register your attendance and try again",
            toastStyle
          );
          this.setBearerToken(
              import.meta.env.VITE_APP_BEARER_TOKEN
          );
          this.regAttendance(data as FormData);

          // return this.login(data);
        }
        throw error;
      });
  };

  regAttendance = async (_data: FormData): Promise<any> => {
    console.log("Executing regAttendance method");

    try {
      const response = await axiosInstance.get(
        `/generate-registration-options?matric_number=${_data.matric_number}` ||
          this.endpoint,
        {
          headers: {
            Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
          },
        }
      );

      const registrationOptions =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      const registrationResponse = await startRegistration(registrationOptions);

      await axiosInstance.post(
        `/verify-registration-response?matric_number=${_data.matric_number}`,
        registrationResponse,
        {
          headers: {
            Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
          },
        }
      );
      toast.success("Attendance Registered Successfully, Go ahead and log in", toastStyle);
      return registrationOptions;
    } catch (error) {
      throw error;
    }
  };

  AuthAttendance = async (): Promise<any> => {
    try {
      await axiosInstance
        .get(this.endpoint, {
          headers: {
            Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
          },
        })
        .then(async (res) => {
          const registrationOptions = JSON.parse(res.data);
          const registrationResponse = await startAuthentication(
            registrationOptions
          );
          await axiosInstance.post(
            "/verify-authentication-response",
            registrationResponse,
            {
              headers: {
                Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
              },
            }
          );
          return registrationOptions;
        });
    } catch (error) {
      throw error;
    }
  };

  refreshToken = () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      return Promise.reject(new Error("Refresh token not available"));
    }

    return axiosInstance
      .post(
        "/refresh",
        { refresh_token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        const newAccessToken = response.data.new_access_token;
        this.setBearerToken(newAccessToken);
        localStorage.setItem("access_token", newAccessToken);

        return newAccessToken;
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
        toast.error(`Error refreshing token: ${error}`, toastStyle);

        throw error;
      })
      .finally(() => {
        this.isRefreshing = false;
      });
  };

  setupTokenRefresh = () => {
    setInterval(() => {
      this.checkTokenAndRefresh();
    }, 14 * 60 * 1000);
  };

  checkTokenAndRefresh = () => {
    const expirationTime = 15 * 60 * 1000;
    const currentTime = performance.now();

    if (expirationTime - currentTime < 840 * 1000) {
      this.isRefreshing = true;
      this.refreshToken()
        .then(() => {
          console.log("Token refreshed successfully");
        })
        .catch((error) => {
          console.error("Error refreshing token:", error);
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    }
  };
}

export default APIClient;
