
 import planDetailOutput from "../planDetailOutput";
import planDetailInput from "../planDetailInput";
import planManufacturing from "../planManufacturing";

interface createPlanRollVm {
    productionPlanID: string;
    planName: string;
    branchID: string;
    productID: string;
    totalSource: number;
    totalTarget: number;
    totalExist: number;
}

export interface createPlanCutRollVm {
    receiptID: number;
    receiptImei: number;
    receiptDate: Date;
    branchId: string;
    receiptNo: string;
    totalRoll: number;
    totalCut: number;
    sortOrder: number;
    imei: string;
    specification: string;
    weight1: number;
    weight2: number;
    weight3: number;
    description: string;
    listSteelDefectDetails: any[],
    [key: string]: any
}

interface planManufacturingVm extends planManufacturing {
    listPlanDetailInputs: planDetailInput[]
}

export interface LAPKEHOACH_MANAGE_Vm {
    planManufacturingVm: planManufacturingVm
}

export interface createPlanRollVmPrintVm {
    productionPlanID: string;
    planDetailInputID: number;
    sortOrder: number;
    specification: string;
    weightRoll: number;
    imei: string;
    weightTape: number;
    widthLeft: number;
    widgetRight: number;
    weightScrap: number;
    ShowInfo: boolean;
    indexCol: number;
}

export default createPlanRollVm;