
export interface User_Data {
    AdminId?: number;
    Email?: string;
    FirstName?: string;
    LastName?: string;
    Permission?: getPermission[];
    Roles?: getAbility[];
}

export interface getAbility {
    RoleName: string;
    RoleDescription: string;
}

export interface getPermission {
    PermissionName: string;
    PermissionDescription: string;
}