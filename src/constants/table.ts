import type { HeadersTable } from "../types";

export const storeTableHeaders:HeadersTable[] = [
    {
        key: 'BranchId',
        title: 'Store Id',
    },
    {
        key: 'BranchName',
        title: 'Store Name',
    },
    {
        key: 'ContactPhone',
        title: 'Contact Phone',
    },
    {
        key: 'ContactEmail',
        title: 'Contact Email',
    },
    {
        key: 'NumberOfPos',
        title: 'number of POS',
    },
    {
        key: 'CreatedAt',
        title: 'Created At',
    },
    {
        key: 'UpdatedAt',
        title: 'Updated At',
    },
    {
        key: 'Status',
        title: 'Status',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
];

export const productTableHeaders:HeadersTable[] = [
    {
        key: 'ProductInfo',
        title: 'Product',
        type: 'custom',
    },
    {
        key: 'ProductCode',
        title: 'Product Code',
    },
    {
      key: 'ProductBrand',
      title: 'Product Brand',
      type: 'custom'
    },
    {
        key: 'ProductStatus',
        title: 'Status',
        type: 'custom',
    },
    {
        key: 'ProductPrice',
        title: 'Price',
        type: 'custom',
    },
    {
        key: 'ProductCost',
        title: 'Cost',
        type: 'custom',
    },
    {
        key: 'ProductTaxType',
        title: 'Vat Type',
        type: 'custom',
    },
    {
        key: 'ProductDiscountPercent',
        title: 'Percent Discount',
        type: 'custom',
    },
    {
        key: 'ProductDiscountAmount',
        title: 'Amount Discount',
        type: 'custom',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
];

export const posTableHeaders:HeadersTable[] = [
    {
      key: 'PosSystemId',
      title: 'Id',
    },
    {
        key: 'PosSystemName',
        title: 'Pos System Name',
      },
    {
      key: 'PosSystemKey',
        title: 'Pos System Key',
    },
    {
      key: 'BranchName',
      title: 'Branch Name',
    },
    {
      key: 'PosCreatedAt',
      title: 'Created At',
    },
    {
        key: 'PosUpdatedAt',
        title: 'Updated At',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
];

export const testHeaders:HeadersTable[] = [
    {
        key: 'BranchId',
        title: 'Store Id',
    },
    {
        key: 'BranchName',
        title: 'Store Name',
    },
    {
        key: 'ContactPhone',
        title: 'Contact Phone',
    },
    {
        key: 'ContactEmail',
        title: 'Contact Email',
    },
    {
        key: 'NumberOfPos',
        title: 'number of POS',
    },
    {
        key: 'CreatedAt',
        title: 'Created At',
    },
    {
        key: 'UpdatedAt',
        title: 'Updated At',
    },
    {
        key: 'Status',
        title: 'Status',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
];

export const brandTableHeaders:HeadersTable[] = [
    {
      key: 'ProductBrandId',
      title: 'Id',
    },
    {
      key: 'ProductBrandName',
      title: 'Brand Name',
      type: 'custom',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
];

export const categoriesTableHeaders:HeadersTable[] = [
    {
      key: 'ProductCategoryId',
      title: 'Id',
    },
    {
      key: 'ProductCategoryName',
      title: 'Category Name',
      type: 'custom',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
];

export const stockTableHeaders:HeadersTable[] = [

]

export const stockCardTableHeaders:HeadersTable[] = [

]
