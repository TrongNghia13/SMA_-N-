interface receipt {
    receiptID: number,
    branchID: string,
    monthID: string,
    receiptDate: Date
    receiptType: string,
    materialType: string,
    receiptNo: string,
    sophieu: string,
    sohd: string,
    businessID: string;
    storeID: string,
    storeIDc: string,
    counterpartyID: string,
    productionPlanID: string;
    employeeCode: string,
    receiptContent: string;
    httt: string;
    unitPrice: number;
    ctlq: number;
    chkhau: number;
    thue: number;
    isPrintBarCode: boolean;
    createdBy: string;
    createdDate?: Date,
    ck?: number,
    tienck?: number,
    vat?: number,
    tiengvc?: number,
    tienkvc?: number,
    cat?: number,
    boc?: number,
    tongcong?: number,
    hantra?: Date,
    tratruoc?: number,
    conlai?: number,
    bgvc?: boolean,
    ctvc?: boolean,
    khvc?: boolean,
    chuavc?: boolean,
    xevc?: string,
    tongvc?: number,
    novc?: boolean,
    ghichuvc?: string,
    kiemduyet?: boolean,
}

export interface receiptVm extends receipt {
    thukho?: string,
    kyhieukho?: string; // ki hieu kho
    quantity: number,
    tennv: string,
    counterpartyName: string,
    kyhieu: string,
    counterpartyType: string,
    counterpartyGroup: string,
    counterpartyAddress: string,
    standard: string;
    steelType: string;
    vendor: string;
    productionBatchNo: string;
    galvanizedOrganization: string;
    steelPrice?: string;
    diachikho?: string;
    tentrangthai?: string;
    mautrangthai?: string;
    businessName?: string;
    licensePlate: string;
    workProcessID: string,
}



export default receipt;


// export interface NXNL_VM extends NXNL {
//     thukho: string,
//     kyhieukho: string;
//     soluong: number,
//     tennv: string,
//     tendt: string,
//     kyhieu: string,
//     loaidt: string,
//     nhomdt: string,
//     diachi: string,
//     Standard: string;
//     loai: string;
//     ncc: string;
//     solo: string;
//     dvmgc: string;
//     gianhap: number;
//     diachikho?: string;
//     tentrangthai?: string;
//     mautrangthai?: string;
//     tennvu?: string;
// }

// export interface CanXeModel {
//     sophieucan: string;
//     soxe: string;
//     ngaycan: Date;
//     nguoican: string;
//     trongluong: number
// }

// export default NXNL;