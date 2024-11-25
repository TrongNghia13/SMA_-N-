import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateCounterparty from '../models/cateCounterparty';
import cateCounterpartyGroup,{cateCounterpartyGroupVmTreeTable} from '../models/cateCounterpartyGroup';

import menus, { menusVm } from '../models/menus';
class CateCounterpartyService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetListGetVendorByGroupId = async (groupId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_COUNTERPARY_GETLISTVENDORBYGI + groupId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateCounterparty>(optionRequest);
        return data;
    }
    public GetListCouterByTypeAndGroup = async (typeId: string, groupId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_COUNTERPARY_GETLISTBYTYAGR + typeId + "&" + groupId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateCounterparty>(optionRequest);
        return data;
    }
    public GetListCounterPartyGroup = async (type: string, isChild: boolean) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_COUNTERPARYGROUP_GETLIST + type + "&" + isChild;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateCounterpartyGroup>(optionRequest);
        return data;
    }
    public GetCounterPartyGroupByID = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_COUNTERPARYGROUP_GETBYID + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<cateCounterpartyGroup>(optionRequest);
        return data;
    }
    public GetListCounterPartyGroupType = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_COUNTERPARTYTYPE_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateCounterpartyGroup>(optionRequest);
        return data;
    }
    public CreateCounterpartyGroup = async (req: cateCounterpartyGroup) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_COUNTERPARYGROUP_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestListObject<cateCounterpartyGroup>(optionRequest);
        return data;
    }
    public GetListCounterPartyByID = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_COUNTERPARY_GET + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<cateCounterparty>(optionRequest);
        return data;
    }
    public CreateCounterparty = async (req: cateCounterparty) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_COUNTERPARY_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<cateCounterparty>(optionRequest);
        return data;
    }
    public GetListTreeGridCounterGroup = async (typeId : string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_COUNTERPARYGROUP_LIST_TREEGRID_BY_TYPE + typeId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<cateCounterpartyGroupVmTreeTable>(optionRequest);
        return data;
    }
    public DeleteCounterGroup = async (groupId : string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_COUNTERPARYGROUP_DELETE + groupId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<cateCounterpartyGroup>(optionRequest);
        return data;
    }
    public DeleteCounter = async (groupId : string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_COUNTERPARY_DELETE + groupId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<cateCounterparty>(optionRequest);
        return data;
    }
};
export default CateCounterpartyService;