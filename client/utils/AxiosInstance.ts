import axios from "axios";
import {useAuthStore} from "@/store/AuthStore";
import {User} from "@/types/User";
import {
    requestInterceptoronFulfilled,
    requestInterceptoronRejected, responseInterceptoronRejected
} from "@/utils/AxiosInterceptors";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

AxiosInstance.interceptors.request.use(
    requestInterceptoronFulfilled, requestInterceptoronRejected
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
    (response) => response, responseInterceptoronRejected
);