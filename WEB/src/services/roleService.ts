
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';

import ROLES, { role_VM } from '../models/role';
import ROLE_MENUS, { roleMenu_VM } from '../models/roleMenu';
import ROLE_REPORT, { roleReport_VM } from '../models/roleReport';
import ROLE_MANAGER_Request from '../models/request/roleManagerRequest'
import TreeData from '../models/ui/treeData'
import role from '../models/role';
import roleManagerRequest from '../models/request/roleManagerRequest';
import roleMenu from '../models/roleMenu';
import roleReport from '../models/roleReport';
import { Tree } from 'rc-easyui';
import roleApp from '../models/roleApp';

class RoleController {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ROLES_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<role>(optionRequest);
        return data;
    }

    public GetRoleById = async (roleID: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ROLES_GETBYID + roleID;
        optionRequest.data = { roleID };
        var data = await this.aAxiosCommon.requestSingle<role>(optionRequest);
        return data;
    }

    public Update = async (req: role) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.ROLES_UPDATE + req.roleID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<role>(optionRequest);
        return data;
    }
    public Create = async (req: role) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ROLES_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Manager = async (req: role) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ROLES_MANAGER;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public Delete = async (roleID: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.ROLES_DELETE + roleID;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    //--------------------------------------------------------------------------------------------//
    //RoleMenu//

    public GetRoleMenuList = async (req: roleManagerRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ROLES_MENU_LIST;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<roleMenu_VM>(optionRequest);
        return data;
    }

    public GetRoleMenuTreeList = async (roleId: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ROLES_MENU_TREE_LIST;
        optionRequest.data = roleId;
        var data = await this.aAxiosCommon.requestSingle<role>(optionRequest);
        return data;
    }

    public GetTreeMenuByRoleId = async (roleID: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ROLES_MENU_GETTREEBYID + roleID;
        optionRequest.data = { roleID };
        var data = await this.aAxiosCommon.request<TreeData>(optionRequest);
        return data;
    }

    public RoleMenuManager = async (req: roleMenu) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ROLES_MENU_MANAGER;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public RoleMenuManagerTreeList = async (req: Array<ROLE_MENUS>) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ROLES_MENU_MANAGER_BY_LIST;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public RoleMenuUpdate = async (req: roleMenu) => {
        // var optionRequest: AxiosRequestConfig = {};
        // optionRequest.method = 'PUT';
        // optionRequest.url = APIURL.ROLES_MENU_UPDATE+"/"+req.roleMenuID;
        // optionRequest.data = req;
        // var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        // return data;
    }

    public RoleMenuCreate = async (req: role) => {
        // var optionRequest: AxiosRequestConfig = {};
        // optionRequest.method = 'POST';
        // optionRequest.url = APIURL.ROLES_MENU_CREATE;
        // optionRequest.data = req;
        // var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        // return data;
    }

    public RoleMenuDelete = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.ROLES_MENU_DELETE + id;
        optionRequest.data = { id: id };
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetListRoleMenuByRoleId = async (roleID: number) => {
        // var optionRequest: AxiosRequestConfig = {};
        // optionRequest.method = 'GET';
        // optionRequest.url = APIURL.ROLES_MENU_GETLIST;
        // optionRequest.data = {roleID};
        // var data = await this.aAxiosCommon.requestSingle<roleMenu>(optionRequest);
        // return data;
    }

    //*--------------------------------------------------------------------------------------*//
    //*RoleReport*//

    public GetRoleReportTreeList = async (roleID: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ROLES_REPORT_TREE_LIST + roleID;
        optionRequest.data = roleID;
        var data = await this.aAxiosCommon.request<TreeData>(optionRequest);
        return data;
    }

    public RoleReportManagerTreeList = async (req: Array<roleReport>) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ROLES_REPORT_MANAGER_BY_LIST;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public RoleAppManagerTreeList = async (req: Array<roleApp>) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ROLES_APP_MANAGER_BY_LIST;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    //*--------------------------------------------------------------------------------------*//
    //*RoleApp*//

    public GetTreeListRoleAppByRoleId = async (roleID: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ROLES_APP_TREE_LIST + roleID;
        optionRequest.data = roleID;
        var data = await this.aAxiosCommon.request<TreeData>(optionRequest);
        return data;
    }
}
export default RoleController;
