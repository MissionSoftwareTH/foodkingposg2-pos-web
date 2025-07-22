export interface StockResponse {
    ProductInfoId: number;
    ProductName: string;
    BranchId: number;
    BranchName: string;
    CurrentStock: number;
    Status?: string;
    CreatedAt: string;
    UpdatedAt: string;
    ProductCost: number;
}

export interface StockTable {
    ProductInfo: ProductInfo;
    BranchInfo: BranchInfo;
    CurrentStock: number;
    ProductCost: number;
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
    AdminRoleId: number | undefined;
    BranchId: number | undefined;
    data: StockCardPayloadData[] | undefined;
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