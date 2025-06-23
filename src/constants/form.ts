import type { BranchPayload, formData, OTP_Response, POSPayload, ProductPayload } from "../types";

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