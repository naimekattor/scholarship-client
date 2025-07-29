import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api", //  backend server URL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        // CORRECTED LINE: Use backticks (`) instead of single/double quotes
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 and 403 errors
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/auth");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
