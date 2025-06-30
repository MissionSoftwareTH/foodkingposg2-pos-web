export interface StockResponse {
    ProductName: string;
    BranchName: string;
    CurrectStock: number;
    Status?: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface StockTable {
    ProductName: string;
    BranchName: string;
    CurrectStock: number;
    Status?: string;
}

export interface StockCardPayload {
    ProductPoNumber: string;
    AdminRoleId: number;
    BranchId: number;
    data: StockCardPayloadData[];
}

export interface StockCardPayloadData {
    NumberOfProduct: number;
    ProductInfoId: number;
    ProductCost: number;
}

export interface StockCardResponse {
    
}

export interface StockCardTable {
    StockCardId: number;
    ProductName: string;
    BranchName: string;
    Status: string;
    InStock: number;
    Type: string;
    Amount: number;
    DateRecorded: string;
    Cost: number;
    Price: number;
    Vat: number;
    VatType: string;
    Note: string;
}