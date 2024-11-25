interface roleMenu {
    roleMenuID: number,
    roleID: number,
    menuID: number
}
export interface roleMenu_VM extends roleMenu {
    rolename: string,
    menuname: string
}
export default roleMenu;