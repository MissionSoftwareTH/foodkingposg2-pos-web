export interface AdminListResponse {

}

export interface AdminListTable {
    
}

export interface AdminListPayload {
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    BranchId: number | undefined;
    MerchantId: number | undefined;
    RoleId: number | undefined;
}