import { useLogoutStore, useMemberStore } from "@/store/store";
import axios from "axios";

// let onUnauthorized: (() => void) | null = null;

// export const setUnauthorizedHandler = (handler: (() => void) | null) => {
//     onUnauthorized = handler;
// };

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // access token 만료 
            localStorage.removeItem('accessToken');
            useMemberStore.setState({ isLogin: false });
            useLogoutStore.setState({ isModalOpen: true });
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;