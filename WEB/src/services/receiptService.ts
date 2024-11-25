import { AxiosRequestConfig } from 'axios';
import AxiosCommon from '../commons/axiosCommon';
import APIURL from '../configs/APIConfig';

// import NXHH_SOCT_Request from '../models/request/NXHH_SOCT_Request';
// import NXNL, { receiptVm } from '../models/NXNL';
// import NXNLRequest, { ChiTietTonKhoNLRequest } from '../models/request/NXNLRequest';
// import { lstReceiptDetailVm } from '../models/CHITIET_NXNL';
// import receiptImei from '../models/receiptImei';
// import TONKHONL_CHITIET, { TONKHO_NL_INFO } from '../models/production/TONKHONL_CHITIET';
// import { LapKeHoachCatCuonVM } from '../models/sanxuat/LapKeHoachCuonVM';
import receiptRequest from '../models/request/receiptRequest';
import receipt, { receiptVm } from '../models/receipt';
import { receiptDetailVm } from '../models/receiptDetail';
// import lstReceiptImei from '../models/lstReceiptImei';
import receiptImei from '../models/receiptImei';

class ReceiptService {
    private aAxiosCommon: AxiosCommon;
    constructor() {
        this.aAxiosCommon = new AxiosCommon();
    }

    public CheckMonthIsOpen = async (receiptDate: string) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.CATE_MONTH_CHECKISOPEN + receiptDate;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<boolean>(optionRequest);
        return data;
    }

    public SearchListReceipt = async (req: receiptRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.RECEIPT_SEARCH_LIST;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestListObject<receiptVm>(optionRequest);
        return data;
    }

    // public NHAP_XUAT_NL_NK_LIST = async (req: NXNLRequest) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.NHAP_XUAT_NL_NK_LIST;
    //     optionRequest.data = req;
    //     var data = await this.aAxiosCommon.request<receiptVm>(optionRequest);
    //     return data;
    // }

    // public GetListCTNXNL = async (ReceiptIdnl: number) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.NHAP_XUAT_NL_LIST_CT_NXNL;
    //     optionRequest.data = { ReceiptIdnl };
    //     var data = await this.aAxiosCommon.request<lstReceiptDetailVm>(optionRequest);
    //     return data;
    // }

    public GetListReDetail_AND_ReIMEI = async (receiptId: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'GET';
        optionRequest.url = APIURL.RECEIPT_DETAIL_GETLIST_A_REIMEI + receiptId;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public GetReceiptNoOfReceipt = async (req: receiptRequest) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.RECEIPT_GETRECEIPTNO;
        optionRequest.data = req;
        var data = await this.aAxiosCommon.requestSingle<string>(optionRequest);
        return data;
    }

    public DeleteReceipt = async (receiptID: number) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'DELETE';
        optionRequest.url = APIURL.RECEIPT_DELETE + receiptID;
        optionRequest.data = {};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public RECEIPT_UPDATE = async (receipt: receiptVm, lstReceiptDetail: Array<receiptDetailVm>, lstReceiptImei: Array<receiptImei>  ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.RECEIPT_UPDATE;
        optionRequest.data = { receipt, lstReceiptDetail, lstReceiptImei};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public UpdateReceipt = async (receipt: receiptVm, lstReceiptDetail: Array<receiptDetailVm>, lstReceiptImei: Array<receiptImei>  ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.RECEIPT_UPDATE;
        optionRequest.data = { receipt, lstReceiptDetail, lstReceiptImei};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public SP_NXNL_NHAP_PHU_LIEU_CUON_NHAP_KHAU = async (receipt: receiptVm, lstReceiptDetail: Array<receiptDetailVm>, lstReceiptImei: Array<receiptImei>  ) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.SP_NXNL_NHAP_PHU_LIEU_CUON_NHAP_KHAU;
        optionRequest.data = { receipt, lstReceiptDetail, lstReceiptImei};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    // public SP_NXNL_NHAP_INS_UPDATE_NOI_BO = async (receipt: receiptVm, lstReceiptDetail: Array<lstReceiptDetailVm>, isupdatelstReceiptDetail: boolean  ) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.SP_NXNL_NHAP_INS_UPDATE_NOI_BO;
    //     optionRequest.data = { receipt, lstReceiptDetail, isupdatelstReceiptDetail, lstReceiptImei : null};
    //     var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
    //     return data;
    // }

    // public SP_NXNL_XUAT_INS_UPDATE = async (receipt: receiptVm, lstReceiptDetail: Array<lstReceiptDetailVm>, lstReceiptImei: Array<receiptImei>  ) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.SP_NXNL_XUAT_INS_UPDATE;
    //     optionRequest.data = { receipt, lstReceiptDetail, lstReceiptImei};
    //     var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
    //     return data;
    // }

    // public NHAP_XUAT_NL_INS_UPDATE_BAN = async (receipt: receiptVm, lstReceiptDetail: Array<lstReceiptDetailVm>  ) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.NHAP_XUAT_NL_INS_UPDATE_BAN;
    //     optionRequest.data = { receipt, lstReceiptDetail};
    //     var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
    //     return data;
    // }

    // public ListChiTietTonKhoNL = async (req: ChiTietTonKhoNLRequest) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.NHAP_XUAT_NL_SP_TONKHONL_CHITIET_GET;
    //     optionRequest.data = req;
    //     var data = await this.aAxiosCommon.request<TONKHONL_CHITIET>(optionRequest);
    //     return data;
    // }

    // public SP_TONKHONL_GET = async (req: ChiTietTonKhoNLRequest) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.SP_TONKHONL_GET;
    //     optionRequest.data = req;
    //     var data = await this.aAxiosCommon.requestSingle<TONKHO_NL_INFO>(optionRequest);
    //     return data;
    // }

    // public ListImeiQuetMaAppByLosx = async (losx: string) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.SP_GET_IMEI_NXNL_QUETMA_APP;
    //     optionRequest.data = { losx };
    //     var data = await this.aAxiosCommon.request<string>(optionRequest);
    //     return data;
    // }

    public UpdateWorkProcess = async (request: any) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.NXNL_UPDATE_TRANGTHAI;
        optionRequest.data = request;
        var data = await this.aAxiosCommon.requestSingle<boolean>(optionRequest);
        return data;
    }

    public UpdateSteelDefect = async (receipt: receiptVm, lstReceiptDetail: Array<receiptDetailVm>, lstReceiptImei: Array<receiptImei>) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'PUT';
        optionRequest.url = APIURL.UPDATE_STEELDEFECT;
        optionRequest.data = { receipt, lstReceiptDetail, lstReceiptImei};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    public SP_NXNL_UPDATE_CAN_XE = async (receipt: receiptVm, lstReceiptDetail: Array<receiptDetailVm>, lstReceiptImei: Array<receiptImei>) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.ROLE_TRUCK_SCALE;
        optionRequest.data = { receipt, lstReceiptDetail, lstReceiptImei};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }
    public SP_NXNL_UPDATE_NHAP_KHAU = async (receipt: receiptVm, lstReceiptDetail: Array<receiptDetailVm>, lstReceiptImei: Array<receiptImei>) => {
        var optionRequest: AxiosRequestConfig = {};
        optionRequest.method = 'POST';
        optionRequest.url = APIURL.NXNL_UPDATE_NHAP_KHAU;
        optionRequest.data = { receipt, lstReceiptDetail, lstReceiptImei};
        var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
        return data;
    }

    // public SP_NXNL_NHAP_CATDOI = async (receipt: LapKeHoachCatCuonVM, lstReceiptImei: Array<receiptImei>) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.SP_NXNL_NHAP_CATDOI;
    //     optionRequest.data = { receipt , lstReceiptImei};
    //     var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
    //     return data;
    // }

    // public SP_NXNL_XUAT_CATDOI = async (receipt: LapKeHoachCatCuonVM) => {
    //     var optionRequest: AxiosRequestConfig = {};
    //     optionRequest.method = 'POST';
    //     optionRequest.url = APIURL.SP_NXNL_XUAT_CATDOI;
    //     optionRequest.data = receipt;
    //     var data = await this.aAxiosCommon.requestSingle<any>(optionRequest);
    //     return data;
    // }

}
export default ReceiptService;