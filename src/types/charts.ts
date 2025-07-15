import type { ChartData } from "chart.js";

export interface ChartResponse {
    ChartLabel: string;
    ChartsData: ChartDataResponse[];
}

export interface ChartDataResponse {
    ProductCost: number;
    NumberOfIncoming: number;
    CreatedAt: number;
}

export interface ChartTable {
    ChartLine?: ChartData<'line'> ;
    ChartBar: ChartData<'bar'> ;
    ChartPie?: ChartData<'pie'> ;
};
