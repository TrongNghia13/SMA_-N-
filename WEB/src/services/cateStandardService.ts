
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import CATE_STANDARD from '../models/cateStandard';

class CateStandardService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STANDARD_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<CATE_STANDARD>(optionRequest);
        return data;
    }
    
    public GetById = async (standardID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STANDARD_GetById;
        optionRequest.data = { standardID };
        var data = await this.aAxiosCommon.requestSingle<CATE_STANDARD>(optionRequest);
        return data;
    }
    public Update = async (req: CATE_STANDARD) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_STANDARD_UPDATE+"/"+req.standardID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: CATE_STANDARD) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_STANDARD_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Manager = async (req: CATE_STANDARD) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_STANDARD_MANAGER;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_STANDARD_DELETE + id;
        optionRequest.data = {} ;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
}
export default CateStandardService;