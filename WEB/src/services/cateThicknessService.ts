
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import CATE_THICKNESS from '../models/cateThickness';

class CateThicknesService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.Thickness_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<CATE_THICKNESS>(optionRequest);
        return data;

    }
    public Update = async (req: CATE_THICKNESS) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_THICKNESS_UPDATE+"/"+req.thicknessID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: CATE_THICKNESS) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_THICKNESS_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_THICKNESS_DELETE + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    
    public GetByMa = async (ma: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.Thickness_GETBYMA;
        optionRequest.data = { ma };
        var data = await this.aAxiosCommon.requestSingle<CATE_THICKNESS>(optionRequest);
        return data;
    }
    


}
export default CateThicknesService;