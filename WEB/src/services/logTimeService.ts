
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';

import { logStatusVm } from '../models/logStatus';
import { logFromVm } from '../models/logFrom';
import LogStatusRequest from '../models/request/logStatusRequest'
import LogStatusManager from '../models/request/logStatusManager'
import LogFormRequest from '../models/request/logFormRequest'

class LogTimeService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    public AddUpLogStatus = async (req: LogStatusManager) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ADDUP_LOG_STATUS;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    
    public AddUpLogForm = async (req: LogFormRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ADDUP_LOG_FORM;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    
    // public GetLogStatusList = async () => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.LOG_STATUS_LIST;
    //     optionRequest.data = {};
    //     var data = await this.aAxiosCommon.request<LOG_STATUS_VM>(optionRequest);
    //     return data;
    // }

    public GetLogStatusList = async (req: LogStatusRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.LOG_STATUS_LIST;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<logStatusVm>(optionRequest);
        return data;
    }
    
    public GetListByLoginId = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.LOG_FORM_LISTBYLOGINID;
        optionRequest.data = { Id: id };
        var data = await this.aAxiosCommon.request<logFromVm>(optionRequest);
        return data;
    }
    
    
}
export default LogTimeService;