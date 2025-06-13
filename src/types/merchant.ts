export interface MerchantData {
    MerchantId?: string;
    MerchantName?: string;
    MerchantKey?: string;
    ContactPhone?: string;
    ContactEmail?: string;
    CreatedAt?: string;
    UpdatedAt?:string;
    Status?: number;
    Branches?: BranchData[];
}

export interface BranchData {
    BranchId?: number;
    BranchName?: string;
}