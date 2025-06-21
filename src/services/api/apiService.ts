import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { handleCookie, handleReq, handleReqError } from './interceptors/requestInterceptor';
import { handleRes, handleResError } from './interceptors/responseInterceptor';
const username = import.meta.env.VITE_API_AUTH_USERNAME;
const password = import.meta.env.VITE_API_AUTH_PASSWORD;
const basicAuth = "Basic " + btoa(`${username}:${password}`);

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers:{
    "Content-Type": "application/json",
    "Authorization": basicAuth,
    "x-platform": 'WEB',
    "accept-language": 'TH',
    }
    // timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        handleCookie();
        return handleReq(config);
    },
    (error: AxiosError) => {
        return handleReqError(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // console.log('Response Interceptor:', response.config.url);
        return handleRes(response);
    },
    (error: AxiosError) => {
        return handleResError(error);
    }
);

export default apiClient;