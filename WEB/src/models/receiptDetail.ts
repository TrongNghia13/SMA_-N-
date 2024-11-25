import receiptImei from './receiptImei';

interface receiptDetail {
    receiptDetailID: number;
    receiptID: number;
    productID: string; // mahh = productId
    calculationUnit: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    weight: number;
    totalWeight1: number;
    totalWeight2: number;
    totalWeight3: number;
    isImei: boolean;
    description: string;
    createDate?: Date,

}
export interface receiptDetailVm extends receiptDetail {
    productTypeID: string;
    productName: string;
    vuotton: boolean;
    index: number;
    sortOrder?: number;
    scaleNo: string;
    // employee: string,
    scaleEmployee?: string;
    scaleDate: Date;
    firstWeight?: number;
    secondWeight?: number;
    licensePlate?: string;
    ctimeis?: receiptImei[]
}
export default receiptDetail;