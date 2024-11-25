
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';
import report from '../models/report';
import reportGroup from '../models/reportGroup';
import reportParameter from '../models/reportParameter';
import reportLeftHeadline from '../models/reportLeftHeadline';
//import LOAI_TSORP from '../models/LOAI_TSORP';

import receiptRequest from '../models/request/receiptRequest';
import reportInfoSearch from '.././models/reportInfoSearch';

class ReportService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetNhomRPList = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.NHOM_RP_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<reportGroup>(optionRequest);
        return data;
    }

    public GetNhomRPById = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.NHOM_RP_GETBYID;
        optionRequest.data = { Id: id };
        var data = await this.aAxiosCommon.requestSingle<reportGroup>(optionRequest);
        return data;
    }

    public NhomRPManager = async (req: reportGroup) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.NHOM_RP_MANAGER;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public NhomRPDelete = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.NHOM_RP_DELETE;
        optionRequest.data = { id: id};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetBaoCaoList = async (Id: number ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.REPORT_LIST;
        optionRequest.data = { Id };
        var data = await this.aAxiosCommon.request<report>(optionRequest);
        return data;
    }

    public GetBaoCaoById = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.REPORT_GETBYID;
        optionRequest.data = { Id: id };
        var data = await this.aAxiosCommon.requestSingle<report>(optionRequest);
        return data;
    }

    public BaoCaoManager = async (baocao: report, thamsos: Array<reportParameter>) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.REPORT_MANAGER;
        optionRequest.data = { baocao, thamsos};
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public BaoCaoDelete = async (id: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.REPORT_DELETE;
        optionRequest.data = { id: id};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetListThamSoRP = async (baocaoId: number) => {
        // var optionRequest: AxiosRequestConfig = {};
        // optionRequest.method = 'POST';
        // optionRequest.url = APIURL.reportParameter_LIST;
        // optionRequest.data = { Id: baocaoId};
        // var data = await this.aAxiosCommon.request<reportParameter>(optionRequest);
        // return data;
    }

    public GetListLeftHeadlineRP = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.REPORTLEFTHEADLINE_RP_LIST;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.request<reportLeftHeadline>(optionRequest);
        return data;
    }

    public GetTieuDeTraiRPById = async (id: number) => {
        // var optionRequest: AxiosRequestConfig = {};
        // optionRequest.method = 'POST';
        // optionRequest.url = APIURL.reportLeftHeadline_GETBYID;
        // optionRequest.data = { Id: id };
        // var data = await this.aAxiosCommon.requestSingle<reportLeftHeadline>(optionRequest);
        // return data;
    }

    public TieuDeTraiRPManager = async (req: reportLeftHeadline) => {
        // var optionRequest: AxiosRequestConfig = {};
        // optionRequest.method = 'POST';
        // optionRequest.url = APIURL.reportLeftHeadline_MANAGER;
        // optionRequest.data = req;
        // var data = await this.aAxiosCommon.request<any>(optionRequest);
        // return data;
    }

    public TieuDeTraiRPDelete = async (id: number) => {
        // var optionRequest: AxiosRequestConfig = {};
        // optionRequest.method = 'POST';
        // optionRequest.url = APIURL.reportLeftHeadline_DELETE;
        // optionRequest.data = { id: id};
        // var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        // return data;
    }

    // public GetListLoaiTSRP = async () => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.LOAI_TSORP_LIST;
    //     optionRequest.data = {};
    //     var data = await this.aAxiosCommon.request<LOAI_TSORP>(optionRequest);
    //     return data;
    // }

    public CheckKhoaSo = async (ngayct: Date) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.BAOCAO_KT_KHOA_SO;
        optionRequest.data = { ngayct };
        var data = await this.aAxiosCommon.requestSingle<number>(optionRequest);
        return data;
    }

    public SP_RP_INFO = async () => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.BAOCAO_SP_RP_INFO;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<reportInfoSearch>(optionRequest);
        return data;
    }

    public SP_RP_DYNAMIC = async (req: receiptRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.BAOCAO_SP_RP_DYNAMIC;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public SP_TRACUU_TONHH = async (thang: string, makho: string, nhomhh: string, mahh: string ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.BAOCAO_SP_TRACUU_TONHH;
        optionRequest.data = { thang, makho, nhomhh, mahh };
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }
    
}
export default ReportService;