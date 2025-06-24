import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getExtendCookies, isTimeExceeded } from "../../utils/CookieExtend";

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

export const handleCookie = () => {
    const rawExtendedTime = localStorage.getItem("extendTime") || "";
    // console.log(rawExtendedTime)
    if(rawExtendedTime.length === 0) return;
    const extendedTime = JSON.parse(rawExtendedTime) ;

    if(extendedTime.length > 0) {
        if(isTimeExceeded(extendedTime)) {
        localStorage.removeItem("extendTime");
        getExtendCookies();
        }
    }
}
