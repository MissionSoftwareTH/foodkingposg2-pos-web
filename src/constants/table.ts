import type { HeadersTable } from "../types";

export const storeTableHeaders:HeadersTable[] = [
    {
        key: 'BranchId',
        title: 'store_id',
    },
    {
        key: 'BranchName',
        title: 'store_name',
    },
    {
        key: 'ContactPhone',
        title: 'store_phone',
    },
    {
        key: 'ContactEmail',
        title: 'store_email',
    },
    {
        key: 'NumberOfPos',
        title: 'number_of_pos',
    },
    {
        key: 'CreatedAt',
        title: 'created_at',
    },
    {
        key: 'UpdatedAt',
        title: 'updated_at',
    },
    {
        key: 'Status',
        title: 'status',
    },
    {
        key: 'actions',
        title: 'action',
        type: 'actions',
    }
];

export const productTableHeaders:HeadersTable[] = [
    {
        key: 'ProductInfo',
        title: 'product',
        type: 'custom',
    },
    {
        key: 'ProductCode',
        title: 'product_code',
    },
    {
      key: 'ProductBrand',
      title: 'brand',
      type: 'custom'
    },
    {
        key: 'ProductStatus',
        title: 'status',
        type: 'custom',
    },
    {
        key: 'ProductPrice',
        title: 'price',
        type: 'custom',
    },
    {
        key: 'ProductTaxType',
        title: 'vat_type',
        type: 'custom',
    },
    {
        key: 'ProductDiscountPercent',
        title: 'percent_discount',
        type: 'custom',
    },
    {
        key: 'ProductDiscountAmount',
        title: 'amount_discount',
        type: 'custom',
    },
    {
        key: 'actions',
        title: 'action',
        type: 'actions',
    }
];

export const posTableHeaders:HeadersTable[] = [
    {
      key: 'PosSystemId',
      title: 'pos_id',
    },
    {
        key: 'PosSystemName',
        title: 'pos_name',
      },
    {
      key: 'PosSystemKey',
        title: 'pos_key',
    },
    {
      key: 'BranchName',
      title: 'store_name',
    },
    {
      key: 'PosCreatedAt',
      title: 'created_at',
    },
    {
        key: 'PosUpdatedAt',
        title: 'updated_at',
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
      title: 'brand_id',
    },
    {
      key: 'ProductBrandName',
      title: 'brand_name',
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
      title: 'category_id',
    },
    {
      key: 'ProductCategoryName',
      title: 'category_name',
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
        title: 'product_name',
        type: 'custom',
    },
    {
        key: 'BranchName',
        title: 'store_name',
        type: 'custom',
    },
    {
        key: 'CurrentStock',
        title: 'in_stock',
    },
    {
        key: 'ProductCost',
        title: 'cost',
    },
    {
        key: 'Status',
        title: 'status',
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
        title: 'stockcard_id',
    },
    {
        key: 'ProductName',
        title: 'product_name',
    },
    {
        key: 'BranchName',
        title: 'store_name',
    },
    {
        key: 'PreviosResult',
        title: 'previous_result',
    },
    {
        key: 'CurrentResult',
        title: 'in_stock',
    },
    {
        key: 'Type',
        title: 'Type',
    },
    {
        key: 'Amount',
        title: 'amount',
    },
    {
        key: 'CreatedAt',
        title: 'created_at',
    },
    {
        key: 'Cost',
        title: 'cost',
    },
    {
        key: 'Price',
        title: 'price',
    },
    {
        key: 'VatType',
        title: 'vat_type',
    },
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