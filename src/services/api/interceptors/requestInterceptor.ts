import type { AxiosError, InternalAxiosRequestConfig } from "axios";

export const handleReqError = (error:AxiosError) => {
    return Promise.reject(error);
}

export const handleReq = (config:InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log('Request Interceptor:', config.url);
        return config;
}