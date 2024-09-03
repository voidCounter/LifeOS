import axios from "axios";
import {useAuthStore} from "@/store/AuthStore";
import {User} from "@/types/User";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

AxiosInstance.interceptors.request.use(
    (config) => {
        if (useAuthStore.getState().authenticatedUser != null && useAuthStore.getState().authenticatedUser?.userId) {
            config.headers["user-id"] = useAuthStore.getState()?.authenticatedUser?.userId;
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
        console.log("Request rejected! Maybe a jwt token issue? ");
        const originalRequest = requestError.config;

        // if error status is 401, and request has not been retried
        // TODO: We need to be more specific about the error status
        if (requestError.response && (requestError.response.status === 401 || requestError.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            // try to refresh the jwt token
            try {
                const {data}: {
                    data: User
                } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/refresh`,
                    {
                        withCredentials: true,
                    },
                );

                console.log("Tried to refresh token, got new token: ", data);

                useAuthStore.getState().setAuthenticatedUser(data);

                // retry the original request
                return axios(originalRequest);
            } catch (refreshError) {
                // if refresh token is invalid, redirect to login page
                console.error("Failed to refresh token: ", refreshError);
                useAuthStore.getState().deleteAuthenticatedUser();
                window.location.href = '/login';
            }
        }
        return Promise.reject(requestError);
    }
)
;