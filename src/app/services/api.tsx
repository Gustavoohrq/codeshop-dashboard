import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.URL_API || "http://localhost:8080",
    timeout: 5000,
});

export default axiosInstance;
