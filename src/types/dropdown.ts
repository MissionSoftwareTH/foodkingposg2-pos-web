export interface CategoryList {
    ProductCategoryId: number | undefined;
    ProductCategoryName: string | null;
}

export interface BrandList {
    ProductBrandId: number | undefined;
    ProductBrandName: string | null;
}

export interface ProductStatusList {
    ProductStatusId: number | undefined;
    ProductStatusName: string | null;
}

export interface TaxTypeList {
    ProductTaxTypeId: number;
    ProductTaxTypeName: string;
    ProductTaxTypeDescription: string;
}

export interface BranchList {
    BranchId: number;
    BranchName: string;
    BranchKey: string;
}