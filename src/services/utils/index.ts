import { useAppSetupStore } from '../../store/appSetupStore';
import Cookies from 'js-cookie';
import { getApiHeaders } from '../api/apiHeader';
import type { baseResponse, User_Data } from '../../types';
import type { AxiosResponse } from 'axios';
import apiClient from '../api/apiService';

export * from './CookieExtend';
export * from './controllerUI';

const removelist = ['info','extendTime','isLoggedIn'];

const removelistItem = () => {
    const appSetupStore = useAppSetupStore();
    appSetupStore.user_data = undefined;
    Cookies.remove('x-access-token');
    
    removelist.forEach(item => {
        localStorage.removeItem(item)
    });
}

export const logout = () => {
    removelistItem();
    window.location.href = '/';
    console.log('Logout...');
};

export const getInfo = async () => {
    try {
        const appSetupStore = useAppSetupStore();
        const headers = getApiHeaders();
        const apiUrl = '/admins/admin/info';
        const res:AxiosResponse<baseResponse<User_Data>> = await apiClient.get(apiUrl , {headers});
        console.log(res);
        appSetupStore.user_data = res?.data?.res_data || undefined;
        localStorage.setItem('info' , JSON.stringify(res?.data?.res_data));
        return res?.data?.res_data || undefined;
    } catch (error) {
        console.error(error);
    }
}