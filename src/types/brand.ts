export interface BrandPayload {
    ProductBrandId?: number;
    BrandName?: string | undefined;
}

export interface BrandResponse {
    ProductBrandId: number;
    ProductBrandName: string;
}

export interface BrandTable {
    ProductBrandId: number;
    ProductBrandName: string;
}