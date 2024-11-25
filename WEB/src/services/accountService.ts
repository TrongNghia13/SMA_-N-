import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import DM_Branch from '../models/branch';
// import DM_ERP from '../models/DM_ERP';
import LoginUtils from '../utils/loginUtils';

class AccountService {
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

    public Login = async (username: string, password: string, branchId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.LOGIN;
        optionRequest.data = { username, password, branchId };
        var data = await this.axiosCommon.request<any>(optionRequest, true);
        return data;
    }

    public RefeshToken = async () => {
        try {
            var res = await this.axiosCommon.RefeshToken();
            var dataInfo = JSON.stringify(res.data);
            LoginUtils.SetLogin(dataInfo);
        }
        catch (e) { }
    }
}
export default AccountService;