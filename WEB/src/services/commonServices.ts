
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import historyStatistical from '../models/statistical/historyStatistical';
import receiptRequest from '../models/request/receiptRequest';
class CommonService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetIPInfo = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.COMMON_IPINFO;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public GetHistoryStatistical = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.STATISTICAL_HISTORY_MONTH;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<historyStatistical>(optionRequest);
        return data;
    }
    public GetStatisticalByDate = async (req: receiptRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.STATISTICAL_BYDATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<historyStatistical>(optionRequest);
        return data;
    }
}
export default CommonService;