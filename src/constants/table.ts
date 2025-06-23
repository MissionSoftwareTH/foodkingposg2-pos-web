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
        type: 'actions',
    },
    {
        key: 'ProductCode',
        title: 'Product Code',
    },
    {
      key: 'ProductBrand',
      title: 'Product Brand',
      type: 'actions'
    },
    {
        key: 'ProductStatus',
        title: 'Status',
        type: 'actions',
    },
    {
        key: 'ProductPrice',
        title: 'Price',
        type: 'actions',
    },
    {
        key: 'ProductCost',
        title: 'Cost',
        type: 'actions',
    },
    {
        key: 'ProductTaxType',
        title: 'Vat Type',
        type: 'actions',
    },
    {
        key: 'ProductDiscountPercent',
        title: 'Percent Discount',
        type: 'actions',
    },
    {
        key: 'ProductDiscountAmount',
        title: 'Amount Discount',
        type: 'actions',
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