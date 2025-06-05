import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { handleReq, handleReqError } from './interceptors/requestInterceptor';
import { handleRes, handleResError } from './interceptors/responseInterceptor';

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    withCredentials: false,
    // timeout: 10000,
});

// Request Interceptor

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return handleReq(config);
    },
    (error: AxiosError) => {
        handleReqError(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // console.log('Response Interceptor:', response.config.url);
        return handleRes(response);
    },
    (error: AxiosError) => {
        handleResError(error);
    }
);

export default apiClient;