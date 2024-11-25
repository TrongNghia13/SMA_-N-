import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import cateProduct,{cateProductVm} from '../models/cateProduct';
import cateProductRequest from '../models/request/cateProductRequest';
// import QUYCACH_HH from '../models/QUYCACH_HH';
import cateProductType, { cateProductTypeTreeTable} from '../models/cateProductType';
// import { cateProductVm, DM_HANGHOA_MANAGER } from '../models/DM_HANGHOA';
// import DMHangHoaRequest from '../models/request/DM_HANGHOA_Request';
import treeData from '../models/ui/treeData';


class CateProductService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetListProductTypeTreeGrid = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_PRODUCTTYPE_TREEGRID;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<cateProductTypeTreeTable>(optionRequest);
        return data;
    }

    public GetListProductTypeTreeGridSelect = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.DM_NHOMHANGHOA_TREESELECT;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<treeData>(optionRequest);
        return data;
    }

    public GetProductTypeByMa = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_PRODUCTTYPE_GETBYID + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<cateProductType>(optionRequest);
        return data;
    }

    public ProductTypeCreate = async (req: cateProductType) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCTTYPE_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public ProductTypeUpdate = async (req: cateProductType) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_PRODUCTTYPE_UPDATE + req.productTypeID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public DeleteProductType = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_PRODUCTTYPE_DELETE + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }


    public GetListCateProduct = async (req: cateProductRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCT_LIST;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestListObject<cateProductVm>(optionRequest);
        return data;
    }

    public GetProductById = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.DM_HANGHOA_GET + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<cateProductVm>(optionRequest);
        return data;
    }

    public GetAutoProductID = async (productTypeID: string, length: number, isAutoPutId: boolean, isPrefix: boolean) => {
        var req : cateProductType = {
            productTypeID: productTypeID,
            productTypeName: '',
            parentID: '',
            length: length,
            isAutoPutId: isAutoPutId,
            isPrefix: isPrefix
        };
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCT_GETAUTO;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<string>(optionRequest);
        return data;
    }

    public CreateProduct = async (req: cateProduct) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.CATE_PRODUCT_CREATE;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public UpdateProduct = async (req: cateProduct) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.CATE_PRODUCT_UPDATE + req.productID;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    public DeleteProduct = async (id: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.CATE_PRODUCT_DELETE + id;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    // public GetListQuyCach = async (ma: string) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.QUYCACH_HH_LIST;
    //     optionRequest.data = { ma };
    //     var data = await this.aAxiosCommon.request<QUYCACH_HH>(optionRequest);
    //     return data;
    // }

}
export default CateProductService;