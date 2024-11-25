import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import {instockDetailRequest} from '../models/request/receiptRequest';
import receiptImei from '../models/receiptImei';
class beginningInventoryService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetImeiInventoryMaterial = async (req : instockDetailRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.BEGINING_INVENTORY_GETLISTIMEI;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestListObject<receiptImei>(optionRequest);
        return data;
    }
    public GetQuantityInventoryMaterial = async (req : instockDetailRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.BEGINING_INVENTORY_GETQUANTITY;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestListObject<receiptImei>(optionRequest);
        return data;
    }
};
export default beginningInventoryService;