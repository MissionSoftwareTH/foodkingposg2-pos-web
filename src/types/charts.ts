
export interface ChartResponse {
    ProductCostSummary:ChartDataResponse;
}

export interface ChartDataResponse {
    Data: number[];
    CreatedAt: string[];
}

export interface ChartTable {
    Title: string;
    Data: number[];
    CreatedAt: string[];
};
