import axios from "axios";
import {useAuthStore} from "@/store/AuthStore";
import {User} from "@/types/User";
import {
    requestInterceptoronFulfilled,
    requestInterceptoronRejected, responseInterceptoronRejected
} from "@/utils/AxiosInterceptors";
import {FileUp} from "lucide-react";

// Axios Interceptor Instance
export const FileUploaderAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});

FileUploaderAxiosInstance.interceptors.request.use(
    requestInterceptoronFulfilled, requestInterceptoronRejected
);

// Axios Interceptor: Response Method
FileUploaderAxiosInstance.interceptors.response.use(
    (response) => response, responseInterceptoronRejected
);
