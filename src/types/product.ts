export interface ProductPayload {
    ProductInfoId?: number | null;
    ProductName?: string;
    ProductCode?: string | null;
    ProductImagePath?: File | string | null; 
    ProductBrandId?: number | null; 
    ProductStatusId?: number | null;
    ProductCategoryId?: number | null;
    ProductPrice?: number;
    ProductCost?: number;
    ProductBarcode?: string;
    ProductTaxTypeId?: number | null;
    ProductEnableDiscountPercent?: boolean;
    ProductDiscountPercent?: number | null;
    ProductEnableDiscountAmount?: boolean;
    ProductDiscountAmount?: number | null;
    ProductDescription?: string;
}

export interface ProductResponse {
    ProductInfoId?: number;
    ProductCode?: string; 
    ProductName?: string;
    ProductBarcode?: string;
    ProductDescription?: string;
    ProductPrice?: number; 
    ProductCost?: number; 
    ProductImagePath?: string | null; 
    ProductDiscountPercent?: number | null;
    ProductEnableDiscountPercent?: number | null;
    ProductDiscountAmount?: number | null;
    ProductEnableDiscountAmount?: number | null;
    ProductBrand?: ProductBrand;
    ProductCategory?: ProductCategory;
    ProductStatus?: ProductStatus;
    ProductTaxType?: ProductTaxType;
}

export interface ProductTable {
    ProductInfoId: number | null;
    ProductInfo: ProductInfo;
    ProductCode: string | null; 
    ProductStatus: ProductStatus | null;
    ProductBrand: ProductBrand | null; 
    ProductPrice: number; 
    ProductCost: number ; 
    ProductDiscountPercent: ProductDiscountType;
    ProductDiscountAmount: ProductDiscountType;
    ProductBarcode: string;
    ProductDescription: string;
    ProductTaxType: ProductTaxType;
}

export interface ProductTaxType {
    ProductTaxTypeId: number | null;
    ProductTaxTypeName: string;
    ProductTaxTypeDescription: string;
}

export interface ProductInfo {
    ProductName: string;
    ProductImagePath: string | null;
    ProductCategory: ProductCategory | null;
}

export interface ProductDiscountType {
    ProductEnableDiscount: boolean;
    ProductDiscountValue: number | null;
}

export interface ProductBrand {
    ProductBrandId: number | null;
    ProductBrandName: string;
}

export interface ProductCategory {
    ProductCategoryId: number | null;
    ProductCategoryName: string;
}

export interface ProductStatus {
    ProductStatusId: number | null;
    ProductStatusName: string;
    ProductStatusDescription: string;
}
