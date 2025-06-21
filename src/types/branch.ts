
export interface BranchPayload{
    MerchantId?: number;
    BranchId?: number;
    BranchName?: string;
    BranchEmail?: string;
    BranchPhone?: string;
}

export interface BranchResponse {
   BranchId: number;
   BranchName: string;
   ContactPhone: string;
   ContactEmail: string;
   BranchKey: string;
   CreatedAt: string;
   UpdatedAt: string;
   NumberOfPos: number; 
}

export interface BranchTable {
   BranchId: number;
   BranchName: string;
   ContactPhone: string;
   ContactEmail: string;
   CreatedAt: string
   UpdatedAt: string;
   NumberOfPos: number; 
}
