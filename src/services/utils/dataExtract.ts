import type { DataBaseResponse, PageOption } from "../../types";

export const extractPageOption = (data:DataBaseResponse<any> , page_option:PageOption) => {
    const {CurrentPage , TotalRecords} = data;
    return {...page_option , CurrentPage , TotalRecords};

}