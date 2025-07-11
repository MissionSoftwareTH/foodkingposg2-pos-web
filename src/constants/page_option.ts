import type { PageOption, Sort } from "../types";

export const SortOrderOption:Sort[] = [
  {title: 'Ascending', value: 'asc'},
  {title: 'Descending', value: 'desc'}
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
  { title: 'Product Name', value: 'PRODUCTNAME' },
  { title: 'Product Category Name', value: 'PRODUCTCATEGORYNAME' },
  { title: 'Product Store Name', value: 'PRODUCTBRANDNAME' },
  { title: 'Product Code', value: 'PRODUCTCODE' },
  { title: 'Product Status Name', value: 'PRODUCTSTATUSNAME' },
  { title: 'Product Price', value: 'PRODUCTPRICE' },
  { title: 'Product Cost', value: 'PRODUCTCOST' },
  { title: 'Product Tax Type Name', value: 'PRODUCTTAXTYPENAME' },
  { title: 'Product Discount Percent', value: 'PRODUCTDISCOUNTPERCENT' },
  { title: 'Product Discount Amount', value: 'PRODUCTDISCOUNTAMOUNT' },
];

export const storeSortColumnOption:Sort[] = [
  { title: 'Store ID', value: 'BRANCHID' },
  { title: 'Store Name', value: 'BRANCHNAME' },
  { title: 'Store Email', value: 'BRANCHEMAIL' },
  { title: 'Store Phone', value: 'BRANCHPHONE' },
  { title: 'Store Key', value: 'BRANCHKEY' },
  { title: 'Store Status', value: 'BRANCHSTATUS' },
  { title: 'Store Created At', value: 'BRANCHCREATEDAT' },
  { title: 'Store Updated At', value: 'BRANCHUPDATEDAT' },
  { title: 'Number of POS', value: 'NUMBEROFPOS' },
];

export const posSortColumnOption:Sort[] = [
  { title: 'POS System ID', value: 'POSSYSTEMID' },
  { title: 'POS System Name', value: 'POSSYSTEMNAME' },
  { title: 'POS System Key', value: 'POSSYSTEMKEY' },
  { title: 'POS Created At', value: 'POSCREATEDAT' },
  { title: 'POS Updated At', value: 'POSUPDATEDAT' },
  { title: 'Store Name', value: 'BRANCHNAME' },
  { title: 'Store ID', value: 'BRANCHID' },
];

export const categoriesSortColumnOption:Sort[] = [
  {title: 'Product Category Id', value: 'ProductCategoryId'},
  {title: 'Product Category Name', value: 'ProductCategoryName'}
];

export const brandSortColumnOption:Sort[] = [
  {title: 'Product Brand Id', value: 'ProductBrandId'},
  {title: 'Product Brand Name', value: 'ProductBrandName'}
];

export const stockSortColumnOption:Sort[] = [
  { title: 'Product Name', value: 'ProductName' },
  { title: 'Store Name', value: 'BranchName' },
  { title: 'In Stock', value: 'InStock' },
  { title: 'Status', value: 'Status' },
];

export const stockCardSortColumnOption:Sort[] = [
 
];

export const adminListSortColumnOption:Sort[] = [

];