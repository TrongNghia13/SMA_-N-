
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateSteelType from '../models/cateSteelType';

class CateSteelTypeService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STEELTYPE_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<cateSteelType>(optionRequest);
        return data;
    }
    
    public GetById = async (steelTypeID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STEELTYPE_GetById;
        optionRequest.data = { steelTypeID };
        var data = await this.aAxiosCommon.requestSingle<cateSteelType>(optionRequest);
        return data;
    }
    public Update = async (req: cateSteelType) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_STEELTYPE_UPDATE+"/"+req.steelTypeID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: cateSteelType) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_STEELTYPE_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Manager = async (req: cateSteelType) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_STEELTYPE_MANAGER;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_STEELTYPE_DELETE + id;
        optionRequest.data = {} ;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    
}
export default CateSteelTypeService;