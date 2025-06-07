import type { baseResponse, extendTime } from "../../types";
import { getApiHeaders } from "../api/apiHeader"
import apiClient from "../api/apiService";

export const getExtendCookies = async () => {
    try {
        const headers = getApiHeaders();
        const apiUrl = '/extend/cookie'
        const res:baseResponse<extendTime> = await apiClient.get(apiUrl , {headers});
        const timeData = res.res_data.FormatingTime
        
        if(!timeData) return console.log('cookie extend failed.');
        const extend = timeData.extendTime.asiaBangkok.unixTimestamp;
        localStorage.setItem('extendTime', JSON.stringify(extend));
        return true;
    } catch (error) {
        console.error(error);
        localStorage.removeItem('extendTime');
        return false;
    }
}

export const isTimeExceeded = (extendtime:number) => {
  const currentTimestamp = Math.floor(Date.now());
  const extendTimestamp = Number(extendtime);
  return currentTimestamp > extendTimestamp;
};
