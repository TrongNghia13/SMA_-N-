
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import taskDeliverApp from '../models/taskDeliverApp';
import productImei from '../models/productImei';
class taskDeliveryAppService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetListRollTaskDeliverAppByBranchId = async (brandId: string, fromDate?: string, toDate?: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.TASKAPP_GETLISTBYBRANCHID + brandId + "&" + fromDate + "&" + toDate + "&" + "C";
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<taskDeliverApp>(optionRequest);
        return data;
    }
    public CreateTaskApp = async (req: taskDeliverApp) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.TASKAPP_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<taskDeliverApp>(optionRequest);
        return data;
    }
    public UpdateTaskApp = async (req: taskDeliverApp) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.TASKAPP_UPDATE + req.taskDeliverAppID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<taskDeliverApp>(optionRequest);
        return data;
    }
    public DeleteTaskApp = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.TASKAPP_DELETE + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<taskDeliverApp>(optionRequest);
        return data;
    }
    public GetReceiptNoByPlanType = async (planType: string, dateReceipt: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.TASKAPP_GETRECEIPTNOBYPLANTYE + planType + "&" + dateReceipt;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<string>(optionRequest);
        return data;
    }
    public GetListProductImeiByPlanId = async (planId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.TASKAPP_GETLISTPRODUCTIMEIBYPLANID + "?planId=" +planId  ;
        optionRequest.data = planId;
        var data = await this.aAxiosCommon.requestListObject<productImei>(optionRequest);
        return data;
    }
};
export default taskDeliveryAppService;