import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateProductionPlan from '../models/cateProductionPlan';
import LOSX_MAKH_Request from '../models/LOSX_MAKH_Request';

class cateProductionPlanService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetListPlanNotFinishByBranchId = async (brandId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_PRODUCTION_PLAN_GETLISTBYBRANCHID + brandId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateProductionPlan>(optionRequest);
        return data;
    }

    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCTION_PLAN_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<cateProductionPlan>(optionRequest);
        return data;
    }

    public GetPlanNo = async (planDate: string, planTypeId: string, branchId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'Get';
        optionRequest.url = APIURL.CATE_PRODUCTION_PLAN_GET_PLAN_NO + planDate + '&' + planTypeId + '&' + branchId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetListPlanByBranchID = async (brandId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CateProductionPlan_GetListById + brandId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateProductionPlan>(optionRequest);
        return data;
    }

    public Update = async (req: cateProductionPlan) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_PRODUCTION_PLAN_UPDATE + "/" + req.productionPlanID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: cateProductionPlan) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCTION_PLAN_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Manager = async (req: cateProductionPlan) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.LOSX_MANAGER;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_PRODUCTION_PLAN_DELETE + id;
        optionRequest.data = { id };
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetListNhapXuatNL = async (branchId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CateProductionPlan_GetListById + branchId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<cateProductionPlan>(optionRequest);
        return data;
    }
};
export default cateProductionPlanService;