import type { BranchPayload, BrandPayload, CategoriesPayload, formData, OTP_Response, POSPayload, ProductPayload } from "../types";
import type { AdminListPayload } from "../types/admin";
import type { RoleListPayload } from "../types/role";
import type { StockCardPayload, StockCardPayloadData } from "../types/stock";

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
    ProductPoNumber: '',
    AdminRoleId: undefined,
    BranchId: undefined,
    data: undefined,
}

export const StockCardPayloadDataForm:StockCardPayloadData = {
  NumberOfProducts: 0,
  ProductInfoId: 0,
  ProductCost: 0
}

export const RolePayloadForm:RoleListPayload = {
    RoleName: '',
    Description: '',
}

export const AdminListPayloadForm:AdminListPayload = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    BranchId: undefined,
    MerchantId: undefined,
    RoleId: undefined,
}