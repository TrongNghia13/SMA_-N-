import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import DM_LOAIKH from '../models/catePlanType';

class LoaiKHController {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_PRODUCTION_PLAN_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<DM_LOAIKH>(optionRequest);
        return data;
    }
    
}
export default LoaiKHController;