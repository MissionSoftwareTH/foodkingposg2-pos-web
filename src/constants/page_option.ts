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


//sort column
export const productSortColumnOption:Sort[] = [
  { title: 'Product Name', value: 'PRODUCTNAME' },
  { title: 'Product Category Name', value: 'PRODUCTCATEGORYNAME' },
  { title: 'Product Brand Name', value: 'PRODUCTBRANDNAME' },
  { title: 'Product Code', value: 'PRODUCTCODE' },
  { title: 'Product Status Name', value: 'PRODUCTSTATUSNAME' },
  { title: 'Product Price', value: 'PRODUCTPRICE' },
  { title: 'Product Cost', value: 'PRODUCTCOST' },
  { title: 'Product Tax Type Name', value: 'PRODUCTTAXTYPENAME' },
  { title: 'Product Discount Percent', value: 'PRODUCTDISCOUNTPERCENT' },
  { title: 'Product Discount Amount', value: 'PRODUCTDISCOUNTAMOUNT' },
];

export const storeSortColumnOption: Sort[] = [
  { title: 'Branch ID', value: 'BRANCHID' },
  { title: 'Branch Name', value: 'BRANCHNAME' },
  { title: 'Branch Email', value: 'BRANCHEMAIL' },
  { title: 'Branch Phone', value: 'BRANCHPHONE' },
  { title: 'Branch Key', value: 'BRANCHKEY' },
  { title: 'Branch Status', value: 'BRANCHSTATUS' },
  { title: 'Branch Created At', value: 'BRANCHCREATEDAT' },
  { title: 'Branch Updated At', value: 'BRANCHUPDATEDAT' },
  { title: 'Number of POS', value: 'NUMBEROFPOS' },
];

