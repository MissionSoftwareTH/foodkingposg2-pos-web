export interface POSResponse {
    BranchId: number;
    BranchName: string;
    PosSystem: POSSystem[];
}

export interface POSSystem {
    PosSystemId: number;
    PosSystemName: string;
    PosSystemKey: string;
    PosCreatedAt: string;
    PosUpdatedAt: string;
}

export interface POSPayload {
    BranchId?: number;
    PosSystemsId?: number;
    PosName?: string;
    PosKey?: string;
}

export interface POSTable {
    BranchId: number | undefined;
    BranchName: string | undefined;
    PosSystemId: number | undefined;
    PosSystemName: string;
    PosSystemKey: string;
    PosCreatedAt: string;
    PosUpdatedAt: string;

}

