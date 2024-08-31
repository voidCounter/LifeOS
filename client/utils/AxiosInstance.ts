import axios from "axios";
import {useAuthStore} from "@/store/AuthStore";
import {JWTTOkenDTO} from "@/types/QuizTypes/JWTTokenDTO";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().jwtToken?.token;

        // If token is present, add it to request's Authorization Header
        if (token) {
            if (config.headers) config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    async (requestError) => {
        const originalRequest = requestError.config;

        // if error status is 401, and request has not been retried
        if (requestError.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // try to refresh the jwt token
            try {
                const {data}: {
                    data: JWTTOkenDTO
                } = await AxiosInstance.post('/auth/refresh',
                    {},
                    {
                        withCredentials: true
                    });

                useAuthStore.getState().setJwtToken(data)
                AxiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;

                // retry the original request
                return AxiosInstance(originalRequest);
            } catch (refreshError) {
                // if refresh token is invalid, redirect to login page
                useAuthStore.getState().deleteJwtToken();
                window.location.href = '/login';
            }
        }
        return Promise.reject(requestError);
    }
)
;