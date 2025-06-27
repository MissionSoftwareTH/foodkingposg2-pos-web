import type { BranchPayload, BrandPayload, CategoriesPayload, formData, OTP_Response, POSPayload, ProductPayload } from "../types";
import type { StockCardPayload } from "../types/stock";

export const OTPdataForm:OTP_Response = {
    TempToken: '',
    RefCode: '',
    RequestTime: '',
    RemainingTime: 10,
    OtpExpireIn: 10,
}

export const LoginForm:formData = {
    Email: '',
    Password: '',   
}

export const storeForm:BranchPayload = {
    MerchantId: 1,
    BranchName: '',
    BranchEmail: '',
    BranchPhone: '', 
}

export const productPayloadForm:ProductPayload = {
    ProductInfoId: undefined,
    ProductName: '',
    ProductCode: '',
    ProductImagePath: null,
    ProductBrandId: undefined,
    ProductStatusId: undefined,
    ProductCategoryId: undefined,
    ProductPrice: 0,
    ProductCost: 0,
    ProductBarcode: '',
    ProductTaxTypeId: undefined,
    ProductEnableDiscountPercent: 0,
    ProductDiscountPercent: 0,
    ProductEnableDiscountAmount: 0,
    ProductDiscountAmount: 0,
    ProductDescription: '',
};

export const posPayloadForm:POSPayload = {
  BranchId: undefined,
  PosName: '',
  PosKey: '',
}

export const brandPayloadForm:BrandPayload = {
    BrandName: '',
}

export const categoriesPayloadForm:CategoriesPayload = {
    ProductCategoryName: '',
}

export const stockCardPayload:StockCardPayload = {
    
}