import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import DM_Branch from '../models/branch';

class DataService {
    private axiosCommon: AxiosCommon;
    constructor() {
        this.axiosCommon = new AxiosCommon();
    }
    public GetListBranch = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.BRANCH_LIST;
        // optionRequest.data = { erp, username };
        var data = await this.axiosCommon.requestListObject<DM_Branch>(optionRequest, true);
        return data;
    }

}
export default DataService;