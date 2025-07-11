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
      title: 'Store Name',
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
    {
        key: 'ProductName',
        title: 'Product Name',
        type: 'custom',
    },
    {
        key: 'BranchName',
        title: 'Store Name',
        type: 'custom',
    },
    {
        key: 'CurrentStock',
        title: 'In Stock',
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
]
 
export const stockCardTableHeaders:HeadersTable[] = [
    {
        key: 'StockId',
        title: 'Stock Card Id',
    },
    {
        key: 'ProductName',
        title: 'Product Name',
    },
    {
        key: 'BranchName',
        title: 'Store Name',
    },
    {
        key: 'Status',
        title: 'Status',
    },
    {
        key: 'CurrentStock',
        title: 'In Stock',
    },
    {
        key: 'Type',
        title: 'Type',
    },
    {
        key: 'Amount',
        title: 'Amount',
    },
    {
        key: 'CreatedAt',
        title: 'Date Recorded',
    },
    {
        key: 'Cost',
        title: 'Cost',
    },
    {
        key: 'Price',
        title: 'Price',
    },
    {
        key: 'VatType',
        title: 'Vat Type',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
]

export const RoleTableHeaders:HeadersTable[] = [
    {
        key: 'RoleName',
        title: 'Role Name',
    },
    {
        key: 'Description',
        title: 'Description',
    },
]

export const AdminListTableHeaders:HeadersTable[] = [
    {
        key: 'AdminId',
        title: 'ID',
    },
    {
        key: 'AdminName',
        title: 'Name',
    },
    {
        key: 'Email',
        title: 'Email',
    },
    {
        key: 'Branch',
        title: 'Store Name',
    },
    {
        key: 'RoleName',
        title: 'RoleName',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
]