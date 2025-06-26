export interface CategoriesPayload {
    ProductCategoryId?: number;
    ProductCategoryName?: string | undefined;
}

export interface CategoriesResponse {
    ProductCategoryId: number;
    ProductCategoryName: string;
}

export interface CategoriesTable {
    ProductCategoryId: number;
    ProductCategoryName: string;
}