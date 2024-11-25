import steelDefectDetail from './steelDefectDetail';
interface receiptImei {
    receiptImeiID: number;
    receiptID: number;
    receiptDetailID: number;
    steelType: string;
    productID: string;
    quantity: number | 1;
    standard: string;
    vendor: string;
    productionBatchNo: string;
    galvanizedOrganization: string;
    steelPrice: string;
    width: string;
    thickness: string;
    weight: number;
    imei: string;
    specification: string;
    description: string;
    sortOrder: number;
    //option
    listSteelDefectDetails?: steelDefectDetail[],
    parentID: number;
    weight1: number;
    weight2: number;
    weight3: number;
    image: string;
    image2: string;
    image3: string;
    workProcessID?: string,
    ngaysoct?: string,
    receiptDate?: Date,
    soct?: string;
    ten_lnl?: string,
    key?: string,
    index?: number,
    planDetailInputID?: number,
    dongia?: number,
    createdBy: string,
    createdDate?: string,
    pl_diem?: number,
    pl_boc?: number,
    pl_giay?: number,
    pl_nhua?: number,
    isChecked? : any
}
export interface receiptImeiVm{

    [key: string] : any

}
export default receiptImei;