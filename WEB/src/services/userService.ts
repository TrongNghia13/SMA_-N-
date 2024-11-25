
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import userInformation from '../models/userInformation';
import {usersVm,usersManagerVm} from '../models/users';
import UserUpdatePassRequest from '../models/request/userUpdatePassRequest';
class userService {
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

    public GetManagerByID = async (userId : number ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.USERS_GETMANAGERBYID + userId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<usersManagerVm>(optionRequest);
        return data;
    }
    public GetListAdmintrator = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.USERS_LIST_QUANTRI;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<usersVm>(optionRequest);
        return data;
    }
    public GetList= async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.USERS_GET_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<usersVm>(optionRequest);
        return data;
    }
    public UpdatePassword= async (req : UserUpdatePassRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.USERS_UPDATE_PASS;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestListObject<usersVm>(optionRequest);
        return data;
    }

    public UserMananger=async(req:usersManagerVm)=>{
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.USERS_UPDATE_ROLE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
};
export default userService;