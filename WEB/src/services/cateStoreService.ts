
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateStore from '../models/cateStore';
import cateStoreType from '../models/cateStoreType';;
class cateStoreService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }
    public GetListStoreByTypeBranchId = async (typeId? : string ,brandId? : string) => {
        if(typeId == null || typeId == ""){
            typeId = "0"
        }
        if(brandId == null || brandId == ""){
            brandId = "0"
        }
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STORE_GETLISTBYTYPEBRANCH + "/" + typeId + "&" + brandId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateStore>(optionRequest);
        return data;
    }
    public GetListStore = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STORE_GETLIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateStore>(optionRequest);
        return data;
    }
    public GetListLoaiKho = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.LOAI_KHO_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateStoreType>(optionRequest);
        return data;
    }

    public GetCateStoreTypeById = async (storeTypeID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STORETYPE_GET + storeTypeID;
        optionRequest.data = { storeTypeID };
        var data = await this.aAxiosCommon.requestSingle<cateStoreType>(optionRequest);
        return data;
    }

    public CreateStoreType = async (req: cateStoreType) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_STORETYPE_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public UpdateStoreType = async (req: cateStoreType) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_STORETYPE_UPDATE + req.storeTypeID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public DeleteLoaiKho = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.LOAI_KHO_DELETE + id;
        optionRequest.data = { id };
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetListKho = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.KHO_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestListObject<cateStore>(optionRequest);
        return data;
    }

    public GetListKhoManager = async (storeTypeID: string, branchID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.KHO_LIST_MANAGER;
        optionRequest.data = { storeTypeID, branchID};
        var data = await this.aAxiosCommon.request<cateStore>(optionRequest);
        return data;
    }

    public GetStoreById = async (storeID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_STORE_GET + storeID;
        optionRequest.data = { storeID };
        var data = await this.aAxiosCommon.requestSingle<cateStore>(optionRequest);
        return data;
    }

    public CreateStore = async (req: cateStore) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_STORE_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public UpdateStore = async (req: cateStore) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_STORE_UPDATE + req.storeID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public DeleteKho = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.KHO_DELETE + id;
        optionRequest.data = { id };
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
};
export default cateStoreService;