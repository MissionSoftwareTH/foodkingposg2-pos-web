export interface StockResponse {
    
}

export interface StockTable {
    ProductName: string;
    BranchName: string;
    InStock: number;
    Status: string;
}

export interface StockCardPayload {

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