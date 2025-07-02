export interface StockResponse {
    ProductInfoId: number;
    ProductName: string;
    BranchId: number;
    BranchName: string;
    CurrentStock: number;
    Status?: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface StockTable {
    ProductInfo: ProductInfo;
    BranchInfo: BranchInfo;
    CurrentStock: number;
    Status?: string;
}

export interface ProductInfo {
    ProductInfoId: number;
    ProductName: string;
}

export interface BranchInfo {
    BranchId: number;
    BranchName: string;
}

export interface StockCardPayload {
    ProductPoNumber?: string;
    AdminRoleId: number;
    BranchId: number;
    data: StockCardPayloadData[];
}

export interface StockCardPayloadData {
    NumberOfProducts: number;
    ProductInfoId: number;
    ProductCost: number;
}

export interface StockCardResponse {
    StockId: number;
    Amount: number;
    BranchName: string;
    CreatedAt: string;
    Cost: number;
    Price: number;
    ProductName: string;
    CurrentStock: number;
    Type: string;
    VatType: string;
}

export interface StockCardTable {
    StockId: number;
    Amount: number;
    BranchName: string;
    CreatedAt: string;
    Cost: number;
    Price: number;
    ProductName: string;
    CurrentStock: number;
    Type: string;
    VatType: string;
}