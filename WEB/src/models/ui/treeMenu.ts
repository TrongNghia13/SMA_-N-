import MenuModel from "../menus"
interface TreeMenu {
    mainMenuName: string,
    icon: string,
    mainMenuID: string,
    listMenu: []
}
export interface MenuPage {
    mainMenu: Array<TreeMenu>,
    fastAccessMenu: Array<MenuModel>,
}
export default TreeMenu;