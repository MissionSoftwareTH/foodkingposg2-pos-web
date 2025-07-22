import { useAppSetupStore } from '../../store/appSetupStore';
import Cookies from 'js-cookie';
import type { baseResponse, User_Data } from '../../types';
import type { AxiosResponse } from 'axios';
import apiClient from '../api/apiService';
import { updateAbility } from '../plugin/permissions';

export * from './CookieExtend';
const removelist = ['info','extendTime','isLoggedIn'];

const removelistItem = () => {
     Cookies.remove('x-access-token');
    
    removelist.forEach(item => {
        localStorage.removeItem(item);
    });
}

export const logout = async () => {
    removelistItem();
    await logoutAPI();
    window.location.href = '/';
};

export const fetchUserInfo = async ():Promise<User_Data> => {
    const appSetupStore = useAppSetupStore();
    const apiUrl = '/admins/admin/info';
    const res:AxiosResponse<baseResponse<User_Data>> = await apiClient.get(apiUrl );
    const user_data = res.data.res_data;
    appSetupStore.setUserData(user_data);
    updateAbility(user_data.RoleName || '');
    return res?.data?.res_data;
}


// utils/dateFormatter.ts (You can put this in a separate utility file)

export function formatDateTime(
  dateTimeString: string | Date,
  locale: string = 'th-TH', // Default to Thai locale
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateTimeString);

  // Default options for a common date and time format
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
    timeZone: 'Asia/Bangkok' // Example: Set to Bangkok time zone
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat(locale, mergedOptions).format(date);
}

export const logoutAPI = async () => {
  const apiUrl = 'token/logout';
  const res = await apiClient.get(apiUrl);
  console.log('Logout...');
  return res;
}

export const translator = (array: any[] , t: (key: string) => string) => {
  return array.map(header => ({
    ...header,
    title: t(header.title as string)
  }));
}