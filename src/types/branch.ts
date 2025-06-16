
export interface BranchPayload{
    MerchantId?: number;
    BranchName?: string;
    BranchEmail?: string;
    BranchPhone?: string;
}

export interface BranchResponse {
   BranchId: number;
   BranchName: string;
   ContactPhone: string;
   NumberOfPos: number; 
}

export interface BranchTable {
   BranchId: number;
   BranchName: string;
   ContactPhone: string;
   NumberOfPos: number; 

}
