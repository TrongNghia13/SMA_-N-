
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import truckScale from '../models/truckScale';
class truckScaleService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public UpdateTruckScale = async (truckScale : truckScale) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.USERS_INFORMATION_GETLISTUSERMOBILEBYBRANCHID ;
        optionRequest.data = {truckScale};
        var data = await this.aAxiosCommon.request<truckScale>(optionRequest);
        return data;
    }
};
export default truckScaleService;