
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import mainMenu from '../models/mainMenu';
import menus, { menusVm } from '../models/menus';
import { MenuPage } from '../models/ui/treeMenu';

class MenuService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetMainMenuList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.MAIN_MENU_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<mainMenu>(optionRequest);
        return data;
    }

    public GetMainMenuById = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.MAIN_MENU_GETBYID+id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<mainMenu>(optionRequest);
        return data;
    }

    public MainMenuCreate = async (req: mainMenu) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.MAIN_MENU_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public MainMenuUpdate = async (req: mainMenu) => {

        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.MAIN_MENU_UPDATE+req.mainMenuID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public MainMenuDelete = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.MAIN_MENU_DELETE +id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetMenuList = async (mainMenuID: number ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.MENU_LIST;
        optionRequest.data = { mainMenuID: mainMenuID };
        var data = await this.aAxiosCommon.request<menusVm>(optionRequest);
        return data;
    }
    public GetMenuById = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.MENU_GETBYID+id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<menus>(optionRequest);
        return data;
    }
    public GetListMenuByMainMenuId = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.MENU_GETLISTBYMAINMENUID + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<menus>(optionRequest);
        return data;
    }

    public MenuCreate = async (req: menus) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.MENU_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public MenuUpdate = async (req: menus) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.MENU_UPDATE+req.menuID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public MenuDelete = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.MENU_DELETE+id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetMenuByUserLogin = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.MENU_BY_USER_LOGIN+id;
        optionRequest.data = {id : id};
        var data = await this.aAxiosCommon.requestSingle<MenuPage>(optionRequest);
        return data;
    }

}
export default MenuService;