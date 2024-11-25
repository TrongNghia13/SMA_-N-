import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateJobTittle from '../models/cateJobTitle';


class CateJobTittleService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_JOBTTILE_LIST;
        optionRequest.data = { };
        var data = await this.aAxiosCommon.requestListObject<cateJobTittle>(optionRequest);
        return data;
    }
    
    public GetById = async (jobTitleID: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_JOBTTILE_GETBYID+jobTitleID;
        optionRequest.data = { jobTitleID };
        var data = await this.aAxiosCommon.requestSingle<cateJobTittle>(optionRequest);
        return data;
    }

    public Create = async (req: cateJobTittle) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_JOBTTILE_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public Update = async (req: cateJobTittle) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_JOBTTILE_UPDATE+req.jobTitleID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public Delete = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_JOBTTILE_DELETE + id;
        optionRequest.data = {} ;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

}
export default CateJobTittleService;