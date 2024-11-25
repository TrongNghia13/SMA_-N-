
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import userInformation from '../models/userInformation';
import permissionsSystem from '../models/permissionsSystem';
class PermissionsSystemService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetListUserInformationUseMobile = async (brandId : string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.USERS_INFORMATION_GETLISTUSERMOBILEBYBRANCHID + brandId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<userInformation>(optionRequest);
        return data;
    }
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.PERMISSIONSSYSTEM_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<permissionsSystem>(optionRequest);
        return data;
    }
};
export default PermissionsSystemService;