// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

export type PermissionNames =
    'View Users' | 'Manage Users' |
    'View Roles' | 'Manage Roles' | 'Assign Roles' |
    'Manage Projects' | 'Manage Customers';

export type PermissionValues =
    'users.view' | 'users.manage' |
    'roles.view' | 'roles.manage' | 'roles.assign' |
    'projects.manage' | 'customers.manage';

export class Permission {

    public static readonly viewUsersPermission: PermissionValues = 'users.view';
    public static readonly manageUsersPermission: PermissionValues = 'users.manage';

    public static readonly viewRolesPermission: PermissionValues = 'roles.view';
    public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
    public static readonly assignRolesPermission: PermissionValues = 'roles.assign';

    public static readonly manageProjectsPermission: PermissionValues = 'projects.manage';
    public static readonly manageCustomersPermission: PermissionValues = 'customers.manage';

    constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
        this.name = name;
        this.value = value;
        this.groupName = groupName;
        this.description = description;
    }

    public name: PermissionNames;
    public value: PermissionValues;
    public groupName: string;
    public description: string;
}
