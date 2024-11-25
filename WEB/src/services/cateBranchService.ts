import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateBranch from '../models/cateBranch';

class CateBranchController {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.BRANCH_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<cateBranch>(optionRequest);
        return data;
    }

    public GetByID = async (ma: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_BRANCH_GETBYID + ma;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<cateBranch>(optionRequest);
        return data;
    }

    public Update = async (req: cateBranch) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_BRANCH_UPDATE+"/"+req.branchID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: cateBranch) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_BRANCH_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_BRANCH_DELETE + id;
        optionRequest.data = { id };
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }


    public GetByUseLogin = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.DM_DONVIUD_GET_BY_USERLOGIN;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.request<cateBranch>(optionRequest);
        return data;
    }

    public GetOfUseLogin = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.DM_DONVIUD_GET_OF_USERLOGIN;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestSingle<cateBranch>(optionRequest);
        return data;
    }

}

export default CateBranchController;