
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';

import organizationUnit, { organizationUnitTreeTable } from '../models/organizationUnit';
import TreeData from '../models/ui/treeData';

class CateOrganizationService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetListTreeGrid = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ORUNIT_TREEGRID;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<organizationUnitTreeTable>(optionRequest);
        return data;
    }

    public GetListTreeSelect = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ORUNIT_TREESELECT;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<TreeData>(optionRequest);
        return data;
    }
    public GetListTypeTreeSelect = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ORUNITYPE_LISTTREE;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<TreeData>(optionRequest);
        return data;
    }
    public GetByID = async (Id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.ORUNIT_GETBYID + Id;
        optionRequest.data = { Id: Id};
        var data = await this.aAxiosCommon.requestSingle<organizationUnit>(optionRequest);
        return data;
    }

    public CreateOrgani = async (req: organizationUnit) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ORUNIT_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public UpdateOrgani = async (req: organizationUnit) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.ORUNIT_UPDATE + req.organizationUnitID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public Delete = async (Id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.ORUNIT_DELETE + Id;
        optionRequest.data = { Id: Id};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
}
export default CateOrganizationService;