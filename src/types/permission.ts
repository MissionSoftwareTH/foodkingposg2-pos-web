export interface PermissionListResponse {
    BackendRoleId: number;
    RoleName: string;
    Description: string;
    Abilities: Ability[];
}

export interface Ability {
    SidebarId: number;
    SidebarName: string;
    Permissions: Permissions[];
    SubMenu: SubMenu[];
}

export interface SubMenu {
    SupSidebarMenuId: number;
    SidebarName: string;
    Permissions: SubPermissions[];
}

export interface Permissions {
    PermissionId: number;
    SidebarName: string;
    Status: string;
}

export interface SubPermissions {
    SupPermissionId: number;
    SidebarName: string;
    Status: string;
}