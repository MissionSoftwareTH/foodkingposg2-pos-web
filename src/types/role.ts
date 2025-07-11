
export interface RoleListResponse {
    MerchantName: string;
    BranchName: string;
    Data: RoleListResponseData[];
}

export interface RoleListResponseData {
    RoleId: number;
    RoleName: string;
    Description: string;
}

export interface RoleListTable {
    
}

export interface RoleListPayload {
    RoleName: string;
    Description: string;
}