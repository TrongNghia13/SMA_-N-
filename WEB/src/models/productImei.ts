import steelDefectDetail from './steelDefectDetail';

interface productImei {
    productImeiID: number;
    receiptImeiID: number;
    productID: string;
    quantity: number;
    standard: string;
    steelType: string;
    vendor: string;
    productionBatchNo: string;
    galvanizedOrganization: string;
    steelPrice: string;
    width: string;
    thickness: string;
    weight: string;
    imei: string;
    specification: string;
    description: string;
    sortOrder: number;
    parentID: number;
    weight1: number;
    weight2: number;
    weight3: number;
    image: string;
    image2: string;
    image3: string;
    workProcessID: number,
    ngaysoct?: string,
    ngayct?: Date,
    soct?: string;
    ten_lnl?: string,
    key?: string,
    index?: number,
    listSteelDefectDetails?: steelDefectDetail[],
    idkhvao?: number,
    dongia?: number,
    createdBy: string,
    createdDate: string,
    [key: string] : any
}
export default productImei;