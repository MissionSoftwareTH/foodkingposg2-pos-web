import type { AxiosError, AxiosResponse } from "axios";
import type { baseResponse } from "../../../types";



export const handleResError = (error:AxiosError) => {
    if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized! Redirecting to login...');
                    // window.location.href = '/login'; // ตัวอย่างการ redirect
                    break;
                case 403:
                    console.error('Forbidden! You do not have permission.');
                    break;
                case 404:
                    console.error('Resource not found!');
                    break;
                default:
                    console.error(`Error ${error.response.status}:`, (error.response.data as any)?.message || error.message);
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
}

export const handleResDataError = (response: AxiosResponse<baseResponse<void>>) => {
    switch (response.data.res_code) {
        case 2300:
            break;
        
    }
}

export const handleRes = (response: AxiosResponse) => {
    return response;
}