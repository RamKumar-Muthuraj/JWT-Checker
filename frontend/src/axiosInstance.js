import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jwt-checker.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;