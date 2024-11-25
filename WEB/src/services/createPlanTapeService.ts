
import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';

import createPlanRollVm, { createPlanCutRollVm, LAPKEHOACH_MANAGE_Vm, createPlanRollVmPrintVm } from '../models/productions/createPlanRollVm';
import receiptImei from '../models/receiptImei';
import planManufacturing from '../models/planManufacturing';
import planDetailInput from '../models/planDetailInput';
import planDetailOutput from '../models/planDetailOutput';

class CreatePlanTapeService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public GetPlanNo = async (branchID: string, planType: string, monthID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.PLAN_NO_GET + branchID + "/" + planType + "/" + monthID;
        optionRequest.data = { branchID, planType, monthID };
        var data = await this.aAxiosCommon.requestSingle<string>(optionRequest);
        return data;
    }

    public GET_PLAN_ROLL = async (isFinish: number, branchID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.GET_PLAN_ROLL + isFinish + "&" + branchID;
        optionRequest.data = { isFinish };
        var data = await this.aAxiosCommon.request<createPlanRollVm>(optionRequest);
        return data;
    }

    // public SP_KEHOACH_CUON_SX_GET = async (ketthuc: number) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.KH_SX_SP_KEHOACH_CUON_SX_GET;
    //     optionRequest.data = { ketthuc };
    //     var data = await this.aAxiosCommon.request<createPlanRollVm>(optionRequest);
    //     return data;
    // }

    public KH_SX_SP_KEHOACH_CUON_CANSX_GET = async (ketthuc: number, branchID : string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.PLAN_ROLL_MANUAFACTURING_SCALE_ROLL_GET + ketthuc + "&" + branchID;
        optionRequest.data = { ketthuc };
        var data = await this.aAxiosCommon.request<createPlanRollVm>(optionRequest);
        return data;
    }

    // public KH_SX_SP_KEHOACH_CUON_CATDOI_GET = async (ketthuc: number) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.KH_SX_SP_KEHOACH_CUON_CATDOI_GET;
    //     optionRequest.data = { ketthuc };
    //     var data = await this.aAxiosCommon.request<createPlanCutRollVm>(optionRequest);
    //     return data;
    // }

    // public KH_SX_SP_CHITIET_CUON_CATDOI_GET = async (idimei: number) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.KH_SX_SP_CHITIET_CUON_CATDOI_GET;
    //     optionRequest.data = { idimei };
    //     var data = await this.aAxiosCommon.request<receiptImei>(optionRequest);
    //     return data;
    // }


    public SP_INSTOCK_MATERIAL_GET = async (productplanId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.SP_INSTOCK_MATERIAL_GET + productplanId;
        optionRequest.data = { productplanId };
        var data = await this.aAxiosCommon.request<receiptImei>(optionRequest);
        return data;
    }

    public PLANNING_ROll_GET = async (productplanId: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.PLANNING_ROll_GET + productplanId;
        optionRequest.data = { productplanId };
        var data = await this.aAxiosCommon.request<planManufacturing>(optionRequest);
        return data;
    }

    public SP_KH_CUON_VAO_GET = async (idkh: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.GET_PLANDETAILINPUT + idkh;
        optionRequest.data = { idkh };
        var data = await this.aAxiosCommon.request<planDetailInput>(optionRequest);
        return data;
    }

    public SP_KH_CUON_RA_GET = async (idkh: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.GET_PLANDETAILOUTPUT + idkh;
        optionRequest.data = { idkh };
        var data = await this.aAxiosCommon.request<planDetailOutput>(optionRequest);
        return data;
    }

    public SP_KH_CUON_RA_GET_BY_IDKH = async (idkh: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.GET_PLANDETAILOUTPUT_BY_PLANMANUID + idkh;
        optionRequest.data = { idkh };
        var data = await this.aAxiosCommon.request<planDetailOutput>(optionRequest);
        return data;
    }

    public LAP_KEHOACHSX_INS_UPD = async (model: LAPKEHOACH_MANAGE_Vm) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.PLAN_MANUAFACTURING_INS_UPD;
        optionRequest.data = model;
        var data = await this.aAxiosCommon.requestSingle<number>(optionRequest);
        return data;
    }

    public SP_planManufacturing_DEL = async (idkh: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.PLAN_MANUAFACTURING_DEL + idkh;
        optionRequest.data = { idkh };
        var data = await this.aAxiosCommon.requestSingle<number>(optionRequest);
        return data;
    }

    public SP_RP_CT_KEHOACH_BANG = async (losx: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.SP_RP_CT_KEHOACH_BANG;
        optionRequest.data = { losx };
        var data = await this.aAxiosCommon.request<createPlanRollVmPrintVm>(optionRequest);
        return data;
    }

    public SP_TONNL_CHUA_SX_GET = async (productionPlanID: string, branchID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.INVENTORY_MATERIAL_NOT_MANUAFACTURING_GET + productionPlanID + "&" + branchID;
        optionRequest.data = { productionPlanID };
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public SP_TONBANG_CHUA_SX_GET = async (losx: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.SP_TONBANG_CHUA_SX_GET;
        optionRequest.data = { losx };
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public SP_NXNL_IMEI_UPD_CANSX = async (request: any) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.SCALE_PRODUCT_UPD;
        optionRequest.data = request;
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

    public SP_KIEMTRA_CUON_DA_SX = async (idxuat: any) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.KH_SX_SP_KIEMTRA_CUON_DA_SX;
        optionRequest.data = { idxuat };
        var data = await this.aAxiosCommon.requestSingle<number>(optionRequest);
        return data;
    }

    public SP_KEHOACH_BANG_GET = async (ketthuc: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.KH_SX_SP_KEHOACH_BANG_GET;
        optionRequest.data = { ketthuc };
        var data = await this.aAxiosCommon.request<createPlanRollVm>(optionRequest);
        return data;
    }

    public INVENTORY_NOT_MATERIAL_INPUT_GET = async (material: string, productionPlanID: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.INVENTORY_NOT_MATERIAL_INPUT_GET+material+"&"+productionPlanID;
        optionRequest.data = { material, productionPlanID };
        var data = await this.aAxiosCommon.request<any>(optionRequest);
        return data;
    }

}
export default CreatePlanTapeService;