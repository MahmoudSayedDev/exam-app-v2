import axios from "axios";
import Cookies from "js-cookie";


const axiosInstance = axios.create({
    baseURL: 'https://exam-app.elevate-bootcamp.cloud/api',
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(async (config) => {

    const token = Cookies.get("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default axiosInstance