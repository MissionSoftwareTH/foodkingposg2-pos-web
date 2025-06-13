export interface ProductPayload {
   ProductName?: string;
   ProductCode?: string;
   ProductImagePath?: File | null; 
   ProductBrandId?: number; 
   ProductStatusId?: number;
   ProductCategoryId?: number;
   ProductPrice?: number;
   ProductCost?: number;
   ProductBarcode?: string;
   ProductVatType?: string | null;
   ProductEnableDiscountPercent?: boolean;
   ProductDiscountPercent?: number | undefined;
   ProductEnableDiscountAmount?: boolean;
   ProductDiscountAmount?: number | undefined;
   ProductDescription?: string;
}

export interface ProductResponse {
    ProductCode?: string; 
    ProductName?: string;
    ProductBarcode?: string;
    ProductDescription?: string;
    ProductPrice?: number; 
    ProductCost?: number; 
    ProductImagePath?: string | null; 
    ProductDiscountPercent?: number | null;
    ProductEnableDiscountPercent?: boolean;
    ProductDiscountAmount?: number | null;
    ProductEnableDiscountAmount?: boolean;
    ProductBrand?: ProductBrand;
    ProductCategory?: ProductCategory;
    ProductStatus?: ProductStatus;
    ProductVatType?: string;
}

export interface ProductTable {
   ProductInfo: ProductInfo;
   ProductCode: string | null; 
   ProductStatus: ProductStatus | null;
   ProductBrand: ProductBrand | null; 
   ProductPrice: number | null; 
   ProductCost: number | null; 
   ProductVatType: string;
   ProductDiscountPercent: ProductDiscountType;
   ProductDiscountAmount: ProductDiscountType;
}

export interface ProductInfo {
    ProductName: string;
    ProductImagePath: string | null;
    ProductCategory: ProductCategory | null;
}

export interface ProductDiscountType {
    ProductEnableDiscount: boolean;
    ProductDiscountValue: number
}

export interface ProductBrand {
    ProductBrandId: number;
    ProductBrandName: string;
}

export interface ProductCategory {
    ProductCategoryId: number | undefined;
    ProductCategoryName: string;
}

export interface ProductStatus {
    ProductStatusId: number | undefined;
    ProductStatusName: string;
    ProductStatusDescription: string;
}