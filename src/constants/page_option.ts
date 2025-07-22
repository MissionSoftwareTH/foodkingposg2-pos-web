import type { PageOption, Sort } from "../types";

export const SortOrderOption:Sort[] = [
  {title: 'asc', value: 'asc'},
  {title: 'desc', value: 'desc'}
]

//page option
export const productPageOption:PageOption = {
    TotalRecords: 10,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'asc',
    SortColumn: 'PRODUCTNAME',
}

export const storePageOption:PageOption = {
    TotalRecords: 10,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: 'BRANCHID',
    MerchantId: 1,
}

export const posPageOption:PageOption = {
    TotalRecords: 10,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: 'POSSYSTEMID',
    MerchantId: 1,
}

export const brandPageOption:PageOption = {
    TotalRecords: 1,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: '',
    MerchantId: 1,
}

export const categoriesPageOption:PageOption = {
    TotalRecords: 1,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: '',
    MerchantId: 1,
}

export const stockPageOption:PageOption = {
    TotalRecords: 1,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: '',
    MerchantId: 1, 
}

export const stockCardPageOption:PageOption = {
    TotalRecords: 1,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: '',
    MerchantId: 1, 
}

export const rolePageOption:PageOption = {
    TotalRecords: 1,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: 'RoleName',
    MerchantId: 1,
}

export const adminListPageOption:PageOption = {
    TotalRecords: 1,
    PageSize: 5,
    CurrentPage: 1,
    SortOrder: 'desc',
    SortColumn: '',
    MerchantId: 1,
}

//sort column
export const productSortColumnOption:Sort[] = [
  { title: 'product_name', value: 'PRODUCTNAME' },
  { title: 'category', value: 'PRODUCTCATEGORYNAME' },
  { title: 'store_name', value: 'PRODUCTBRANDNAME' },
  { title: 'product_code', value: 'PRODUCTCODE' },
  { title: 'status', value: 'PRODUCTSTATUSNAME' },
  { title: 'price', value: 'PRODUCTPRICE' },
  { title: 'vat_type', value: 'PRODUCTTAXTYPENAME' },
  { title: 'percent_discount', value: 'PRODUCTDISCOUNTPERCENT' },
  { title: 'amount_discount', value: 'PRODUCTDISCOUNTAMOUNT' },
];

export const storeSortColumnOption:Sort[] = [
  { title: 'store_id', value: 'BRANCHID' },
  { title: 'store_name', value: 'BRANCHNAME' },
  { title: 'store_email', value: 'BRANCHEMAIL' },
  { title: 'store_phone', value: 'BRANCHPHONE' },
  { title: 'status', value: 'BRANCHSTATUS' },
  { title: 'created_at', value: 'BRANCHCREATEDAT' },
  { title: 'updated_at', value: 'BRANCHUPDATEDAT' },
  { title: 'number_of_pos', value: 'NUMBEROFPOS' },
];

export const posSortColumnOption:Sort[] = [
  { title: 'pos_id', value: 'POSSYSTEMID' },
  { title: 'pos_name', value: 'POSSYSTEMNAME' },
  { title: 'pos_key', value: 'POSSYSTEMKEY' },
  { title: 'created_at', value: 'POSCREATEDAT' },
  { title: 'updated_at', value: 'POSUPDATEDAT' },
  { title: 'store_name', value: 'BRANCHNAME' },
];

export const categoriesSortColumnOption:Sort[] = [
  {title: 'category_id', value: 'ProductCategoryId'},
  {title: 'category_name', value: 'ProductCategoryName'}
];

export const brandSortColumnOption:Sort[] = [
  {title: 'brand_id', value: 'ProductBrandId'},
  {title: 'brand_name', value: 'ProductBrandName'}
];

export const stockSortColumnOption:Sort[] = [
  { title: 'product_name', value: 'ProductName' },
  { title: 'store_name', value: 'BranchName' },
  { title: 'in_stock', value: 'InStock' },
  { title: 'cost', value: 'ProductCost'},
  { title: 'status', value: 'Status' },
];

export const stockCardSortColumnOption:Sort[] = [
  { title: 'stockcard_id' , value: 'StockId'},
  { title: 'previous_result' , value: 'PreviosResult'},
  { title: 'amount' , value: 'Amount'},
  { title: 'in_stock' , value: 'CurrentResult'},
  { title: 'store_name' , value: 'BranchName'},
  { title: 'created_at' , value: 'CreatedAt'},
  { title: 'cost' , value: 'Cost'},
  { title: 'price' , value: 'Price'},
  { title: 'product_name' , value: 'ProductName'},
  { title: 'vat_type' , value: 'VatType'},
];

export const adminListSortColumnOption:Sort[] = [

];