interface menus {
    menuID: number;
    menuName: string;
    mainMenuID: number;
    menuKey: string;
    sortOrder: number,
    icon: string,
    fastaccess: boolean
}
export interface menusVm extends menus {
    erpten: string
}
export default menus;