import axios, {InternalAxiosRequestConfig} from 'axios';
import {useAuthStore} from "@/store/AuthStore";
import {User} from "@/types/User";

// Reusable Request Interceptor
export const requestInterceptoronFulfilled = (config: InternalAxiosRequestConfig) => {
    if (useAuthStore.getState().authenticatedUser != null && useAuthStore.getState().authenticatedUser?.userId) {
        config.headers["user-id"] = useAuthStore.getState()?.authenticatedUser?.userId;
    }
    return config;
};
export const requestInterceptoronRejected = (error: any) => {
    return Promise.reject(error);
};

// Reusable Response Interceptor
export const responseInterceptoronRejected = async (requestError: any) => {
    const originalRequest = requestError.config;


    // if error status is 401, and request has not been retried
    // TODO: We need to be more specific about the error status
    if (requestError.response && (requestError.response.status === 401 || requestError.response.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const {data}: {
                data: User
            } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/refresh`, {
                withCredentials: true,
            });

            // console.log("Tried to refresh token, got new token: ", data);

            useAuthStore.getState().setAuthenticatedUser(data);

            // retry the original request
            return axios(originalRequest);
        } catch (refreshError) {
            // if refresh token is invalid, redirect to login page
            useAuthStore.getState().deleteAuthenticatedUser();
            window.location.href = '/login';
        }
    }
    return Promise.reject(requestError);
};
