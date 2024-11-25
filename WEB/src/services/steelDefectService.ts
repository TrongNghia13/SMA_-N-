
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateSteelDefect, {cateSteelDefect_MANAGER , cateSteelDefectList} from '../models/cateSteelDefect';

class LoiSanPhamController {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    
    // public GetList = async (materialType: string) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'GET';
    //     optionRequest.url = APIURL.CATE_STEELDEFECT_GETLISTBYMETERIAL + materialType;
    //     optionRequest.data = {};
    //     var data = await this.aAxiosCommon.request<cateSteelDefectList>(optionRequest);
    //     return data;
    // }
    public GetList = async (request: any) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STEELDEFECT_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<cateSteelDefectList>(optionRequest);
        return data;
    }
    public GetById = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STEEL_DEFECT_GET_BYID +id;
        optionRequest.data = { id };
        var data = await this.aAxiosCommon.requestSingle<cateSteelDefect_MANAGER>(optionRequest);
        return data;
    }
    public Update = async (req: cateSteelDefect) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_STEEL_DEFECT_UPDATE+"/"+req.steelDefectID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public Create = async (req: cateSteelDefect) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_STEEL_DEFECT_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Manager = async (req: cateSteelDefect_MANAGER) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.LOAISP_INS_UPD;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public Delete = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_STEEL_DEFECT_DELETE + id;
        optionRequest.data = {} ;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

}
export default LoiSanPhamController;