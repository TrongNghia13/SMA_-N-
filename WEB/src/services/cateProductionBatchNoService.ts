
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateProductionBatchNo from '../models/cateProductionBatchNo';

class CateProductionBatchNoService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_PRODUCTIONBATCHNO_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<cateProductionBatchNo>(optionRequest);
        return data;
    }
    
    public GetById = async (productionBatchNoID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_PRODUCTIONBATCHNO_GetById;
        optionRequest.data = { productionBatchNoID };
        var data = await this.aAxiosCommon.requestSingle<cateProductionBatchNo>(optionRequest);
        return data;
    }
    public Update = async (req: cateProductionBatchNo) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_PRODUCTIONBATCHNO_UPDATE+"/"+req.productionBatchNoID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: cateProductionBatchNo) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCTIONBATCHNO_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Manager = async (req: cateProductionBatchNo) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCTIONBATCHNO_MANAGER;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_PRODUCTIONBATCHNO_DELETE + id;
        optionRequest.data = {} ;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    
}
export default CateProductionBatchNoService;