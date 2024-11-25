
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import CateWidth from '../models/cateWidth';

class cateWidthService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetListCateWidth = async (widthType: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATEWIDTH_LIST;
        optionRequest.data = { widthType };
        var data = await this.aAxiosCommon.requestListObject<CateWidth>(optionRequest);
        return data;
    }
    public GetListCateWidthByType = async (widthType: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_WIDTH_GETLISTBYTYPE + widthType;
        optionRequest.data = { widthType };
        var data = await this.aAxiosCommon.requestListObject<CateWidth>(optionRequest);
        return data;
    }
    public GetByID = async (Id: CateWidth) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATEWIDTH_GETBYID;
        optionRequest.data = { Id: Id};
        var data = await this.aAxiosCommon.requestSingle<CateWidth>(optionRequest);
        return data;
    }
    public Create = async (req: CateWidth) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATEWIDTH_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Update = async (req: CateWidth ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATEWIDTH_UPDATE+"/"+req.widthID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public Delete = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATEWIDTH_DELETE + id;
        optionRequest.data = { id};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    

}
export default cateWidthService;