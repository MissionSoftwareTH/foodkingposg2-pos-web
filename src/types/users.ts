
export interface User_Data {
    AdminId?: number;
    Email?: string;
    FirstName?: string;
    LastName?: string;
    Permission?: getPermission[];
    RoleDescription?: string;
    RoleName?: string;
}

export interface getPermission {
    PermissionName: string;
    PermissionDescription: string;
    SubPermissions: getSubPermission[];
}

export interface getSubPermission {
    SubPermissionId: number;
    SubPermissionName: string;
    SubPermissionDescription: string;
}