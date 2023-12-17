// import axios, { AxiosInstance } from "axios";
// import { ToastOptions, toast } from "react-toastify";

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// const toastStyle: ToastOptions = {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "light",
// };

// class APIClient<T> {
//   endpoint: string;
//   authToken: string | null = null;
//   isRefreshing: boolean = false;

//   constructor(endpoint: string) {
//     this.endpoint = endpoint;
//     this.setupTokenRefresh();
//   }

//   setBearerToken(token: string) {
//     this.authToken = token;
//   }

//   register = (data: T) => {
//     return axiosInstance
//       .post<T>(this.endpoint, data, {
//         headers: {
//           Authorization: this.authToken ? `Bearer ${this.authToken}` : "",
//         },
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           toast.success("SUCCESS!!", toastStyle);
//         }
//         return res.data;
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         throw error;
//       });
//   };

//   login = (data: T) => {
//     return axiosInstance
//       .post(this.endpoint, data)
//       .then((res) => {
//         if (res.status === 200) {
//           const { access_token, token_type, refresh_token } = res.data;
//           this.setBearerToken(access_token);

//           localStorage.setItem("access_token", access_token);
//           localStorage.setItem("refresh_token", refresh_token);

//           return { access_token, token_type, refresh_token };
//         } else {
//           return Promise.reject("Login failed");
//         }
//       })
//       .catch((error) => {
//         toast.error("Error:", error);
//         throw error;
//       });
//   };


//   refreshToken = async () => {
//     const refreshToken = localStorage.getItem("refresh_token");

//     if (!refreshToken) {
//       throw new Error("Refresh token not available");
//     }

//     try {
//       const response = await axiosInstance.post(
//         "/refresh",
//         { refresh_token: refreshToken },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );
//       const newAccessToken = response.data.new_access_token;
//       this.setBearerToken(newAccessToken);
//       localStorage.setItem("access_token", newAccessToken);

//       return newAccessToken;
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       throw error;
//     } finally {
//       this.isRefreshing = false;
//     }
//   };

//   setupTokenRefresh = () => {
//     setInterval(() => {
//       this.checkTokenAndRefresh();
//     }, 60 * 1000);
//   };

//   checkTokenAndRefresh = async () => {
//     const expirationTime = 15 * 60 * 1000;
//     const currentTime = performance.now();

//     if ((expirationTime - currentTime) < 840 * 1000) {
//       this.isRefreshing = true;
//       try {
//         const newAccessToken = await this.refreshToken();
//         console.log("Token refreshed successfully:", newAccessToken);
//       } catch (error) {
//         console.error("Error refreshing token:", error);
//       }
//     }
//   };
// }

// export default APIClient;

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
        console.error("Error:", error);
        throw error;
      });
  }

  login = (data: T) => {
    return axiosInstance
      .post(this.endpoint, data)
      .then((res) => {
        if (res.status === 200) {
          const { access_token, token_type, refresh_token } = res.data;
          this.setBearerToken(access_token);

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          return { access_token, token_type, refresh_token };
        } else {
          return Promise.reject("Login failed");
        }
      })
      .catch((error) => {
        toast.error("Error:", error);
        throw error;
      });
  }

  refreshToken = () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      return Promise.reject(new Error("Refresh token not available"));
    }

    return axiosInstance.post(
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
        throw error;
      })
      .finally(() => {
        this.isRefreshing = false;
      });
  }

  setupTokenRefresh = () => {
    setInterval(() => {
      this.checkTokenAndRefresh();
    }, 60 * 1000);
  }

  checkTokenAndRefresh = () => {
    const expirationTime = 2 * 60 * 1000;
    const currentTime = performance.now();

    if (expirationTime - currentTime < 9 * 1000) {
      this.isRefreshing = true;
      this.refreshToken()
        .then((newAccessToken) => {
          console.log("Token refreshed successfully:", newAccessToken);
        })
        .catch((error) => {
          console.error("Error refreshing token:", error);
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    }
  }
}

export default APIClient;

